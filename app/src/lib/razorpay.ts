// Razorpay Orders/Payments/Refunds REST calls, plain fetch() (works from a
// Worker exactly like lib/email.ts calls Resend — no SDK needed).
// HMAC-SHA256 signature verification uses Web Crypto, same primitive as
// admin-auth.ts's session-cookie signing — no extra dependency.

const RAZORPAY_API = "https://api.razorpay.com/v1";

function basicAuthHeader(keyId: string, keySecret: string): string {
  return "Basic " + btoa(`${keyId}:${keySecret}`);
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export async function createRazorpayOrder(
  keyId: string,
  keySecret: string,
  amountPaise: number,
  receipt: string,
): Promise<RazorpayOrder> {
  const res = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(keyId, keySecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt,
      notes: { orderId: receipt },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Razorpay order creation failed (${res.status}): ${text}`);
  }
  return res.json();
}

export interface RazorpayPayment {
  id: string;
  order_id: string;
  status: string;
  amount: number;
  method: string;
  captured: boolean;
}

export async function fetchRazorpayPayment(
  keyId: string,
  keySecret: string,
  paymentId: string,
): Promise<RazorpayPayment> {
  const res = await fetch(`${RAZORPAY_API}/payments/${paymentId}`, {
    headers: { Authorization: basicAuthHeader(keyId, keySecret) },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Razorpay payment fetch failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function refundRazorpayPayment(
  keyId: string,
  keySecret: string,
  paymentId: string,
): Promise<{ id: string; status: string }> {
  const res = await fetch(`${RAZORPAY_API}/payments/${paymentId}/refund`, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(keyId, keySecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Razorpay refund failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function sameString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verifies the Checkout.js success-callback signature. */
export async function verifyPaymentSignature(
  keySecret: string,
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
): Promise<boolean> {
  const expected = await hmacSha256Hex(keySecret, `${razorpayOrderId}|${razorpayPaymentId}`);
  return sameString(expected, razorpaySignature);
}

/** Verifies the x-razorpay-signature header against the raw webhook body. */
export async function verifyWebhookSignature(
  webhookSecret: string,
  rawBody: string,
  signatureHeader: string,
): Promise<boolean> {
  const expected = await hmacSha256Hex(webhookSecret, rawBody);
  return sameString(expected, signatureHeader);
}
