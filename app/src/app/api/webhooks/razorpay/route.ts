export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { verifyWebhookSignature } from "@/lib/razorpay";

// Durable source of truth for payment status — handles the case where the
// customer's browser never returns from Razorpay Checkout (closed tab,
// network drop). Idempotent: safe to receive the same event more than once
// (Razorpay retries on any non-2xx response).
export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const valid = await verifyWebhookSignature(webhookSecret, rawBody, signature);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: { event?: string; payload?: { payment?: { entity?: Record<string, unknown> } } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const entity = event.payload?.payment?.entity;
  const razorpayOrderId = typeof entity?.order_id === "string" ? entity.order_id : "";
  const razorpayPaymentId = typeof entity?.id === "string" ? entity.id : "";
  const method = typeof entity?.method === "string" ? entity.method : null;
  if (!razorpayOrderId) return NextResponse.json({ ok: true }); // nothing to do

  const db = getDb();
  const rows = await db.select().from(orders).where(eq(orders.razorpayOrderId, razorpayOrderId)).limit(1).all();
  const order = rows[0];
  if (!order) return NextResponse.json({ ok: true }); // unknown order, ignore

  if (event.event === "payment.captured") {
    // Idempotent + never regress a status the admin has already moved forward.
    if (order.status === "pending_payment" || order.status === "payment_failed") {
      await db
        .update(orders)
        .set({ status: "paid", razorpayPaymentId, paymentMethod: method ?? undefined })
        .where(eq(orders.id, order.id))
        .run();
    }
  } else if (event.event === "payment.failed") {
    if (order.status === "pending_payment") {
      await db.update(orders).set({ status: "payment_failed" }).where(eq(orders.id, order.id)).run();
    }
  }

  return NextResponse.json({ ok: true });
}
