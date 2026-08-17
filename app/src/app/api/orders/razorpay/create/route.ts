export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payments are not configured yet. Please contact us on WhatsApp." }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as { orderId?: string };
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  if (!orderId) return NextResponse.json({ error: "Missing orderId." }, { status: 400 });

  const db = getDb();
  const rows = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1).all();
  const order = rows[0];
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  if (order.status !== "pending_payment") {
    return NextResponse.json({ error: `Order is already ${order.status}.` }, { status: 409 });
  }

  try {
    const rzpOrder = await createRazorpayOrder(keyId, keySecret, order.grandTotal * 100, order.id);
    await db.update(orders).set({ razorpayOrderId: rzpOrder.id }).where(eq(orders.id, orderId)).run();
    return NextResponse.json({ razorpayOrderId: rzpOrder.id, amount: rzpOrder.amount, keyId });
  } catch {
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
