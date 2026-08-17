export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { verifyPaymentSignature, fetchRazorpayPayment } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const { env } = getCloudflareContext();
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    orderId?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const razorpayOrderId = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
  const razorpayPaymentId = typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
  const razorpaySignature = typeof body.razorpay_signature === "string" ? body.razorpay_signature : "";

  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  const db = getDb();
  const rows = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1).all();
  const order = rows[0];
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

  // Idempotent: a page refresh re-posting a stale success callback shouldn't error.
  if (order.status === "paid" || order.status === "confirmed") {
    return NextResponse.json({ ok: true, alreadyProcessed: true });
  }

  if (order.razorpayOrderId !== razorpayOrderId) {
    return NextResponse.json({ error: "Order mismatch." }, { status: 400 });
  }

  const validSignature = await verifyPaymentSignature(keySecret, razorpayOrderId, razorpayPaymentId, razorpaySignature);
  if (!validSignature) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  // Defense in depth: never trust the signature alone — re-fetch the payment
  // from Razorpay's API and confirm it was actually captured for this amount.
  try {
    const payment = await fetchRazorpayPayment(keyId, keySecret, razorpayPaymentId);
    if (payment.order_id !== razorpayOrderId || !payment.captured || payment.amount !== order.grandTotal * 100) {
      return NextResponse.json({ error: "Payment could not be confirmed." }, { status: 400 });
    }
    await db
      .update(orders)
      .set({
        status: "paid",
        razorpayPaymentId,
        razorpaySignature,
        paymentMethod: payment.method,
      })
      .where(eq(orders.id, orderId))
      .run();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not confirm payment. Please contact us." }, { status: 502 });
  }
}
