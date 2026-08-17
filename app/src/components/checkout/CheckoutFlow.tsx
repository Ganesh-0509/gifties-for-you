"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useCart, cartTotals } from "@/lib/cart";
import { money, type PublicSite } from "@/lib/site";
import type { CatProduct } from "@/lib/catalog-types";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Step = "details" | "pay" | "done";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CheckoutFlow({ products, site }: { products: CatProduct[]; site: PublicSite }) {
  const { qty, clear } = useCart();
  const { items, subtotal, itemCount } = cartTotals(qty, products);

  const [step, setStep] = useState<Step>("details");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [grandTotal, setGrandTotal] = useState<number>(subtotal);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    site.pickupAvailable ? "pickup" : "delivery",
  );
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("Chennai");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");

  if (items.length === 0 && step === "details") {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-ink-muted">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block font-semibold text-primary hover:underline">
          Browse the catalogue
        </Link>
      </div>
    );
  }

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          deliveryMethod,
          addressLine,
          city,
          area,
          pincode,
          items: items.map((l) => ({ id: l.product.id, qty: l.qty })),
        }),
      });
      const data = (await res.json()) as { error?: string; id?: string; grandTotal?: number };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setOrderId(data.id ?? null);
      setGrandTotal(data.grandTotal ?? subtotal);
      setStep("pay");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function startPayment() {
    if (!orderId) return;
    setError(null);
    setSubmitting(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Could not load the payment window. Please check your connection.");
        return;
      }
      const createRes = await fetch("/api/orders/razorpay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const createData = (await createRes.json()) as {
        error?: string;
        keyId?: string;
        razorpayOrderId?: string;
        amount?: number;
      };
      if (!createRes.ok) {
        setError(createData.error ?? "Could not start payment.");
        return;
      }

      const rzp = new window.Razorpay({
        key: createData.keyId,
        order_id: createData.razorpayOrderId,
        amount: createData.amount,
        currency: "INR",
        name: site.name,
        description: `Order ${orderId}`,
        prefill: { name: customerName, contact: phone, email: email || undefined },
        theme: { color: "#8a4650" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/orders/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, ...response }),
          });
          if (verifyRes.ok) {
            clear();
            setStep("done");
          } else {
            setError("Payment verification failed. If money was deducted, contact us with your order ID.");
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });
      rzp.open();
    } catch {
      setError("Could not start payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done" && orderId) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold text-ink">Order confirmed!</h2>
        <p className="mt-2 text-ink-muted">
          Order <span className="font-mono font-semibold">{orderId}</span> is paid and on its way to
          being packed. We&rsquo;ll reach out on WhatsApp/phone with updates.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (step === "pay" && orderId) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <h2 className="text-2xl font-semibold text-ink">Complete your payment</h2>
        <p className="mt-2 text-ink-muted">
          Order <span className="font-mono">{orderId}</span> — {money(grandTotal)} due
        </p>
        {error && <p className="mt-4 rounded-md bg-error-soft px-3 py-2 text-sm text-error">{error}</p>}
        <button
          type="button"
          onClick={startPayment}
          disabled={submitting}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-ink-on-primary hover:bg-primary-dark disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Pay {money(grandTotal)} securely
        </button>
        <p className="mt-3 text-xs text-ink-faint">Cards, UPI and netbanking via Razorpay.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submitDetails} className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-ink">Full name</span>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Phone</span>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>

        <div>
          <span className="text-sm font-medium text-ink">Delivery method</span>
          <div className="mt-2 flex gap-3">
            {site.pickupAvailable && (
              <button
                type="button"
                onClick={() => setDeliveryMethod("pickup")}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  deliveryMethod === "pickup" ? "border-primary bg-primary-soft/50 text-primary" : "border-border text-ink-muted"
                }`}
              >
                Store pickup
              </button>
            )}
            <button
              type="button"
              onClick={() => setDeliveryMethod("delivery")}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                deliveryMethod === "delivery" ? "border-primary bg-primary-soft/50 text-primary" : "border-border text-ink-muted"
              }`}
            >
              Delivery {site.deliveryFeeChennai > 0 ? `(+${money(site.deliveryFeeChennai)})` : ""}
            </button>
          </div>
        </div>

        {deliveryMethod === "delivery" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-ink">Address</span>
              <textarea
                required
                rows={2}
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-ink">City</span>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-ink">Pincode</span>
              <input
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-ink">Area / landmark (optional)</span>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        )}

        {error && <p className="rounded-md bg-error-soft px-3 py-2 text-sm text-error">{error}</p>}
      </div>

      <div className="h-fit rounded-xl border border-border bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
          {items.map((l) => (
            <li key={l.product.id} className="flex justify-between gap-2">
              <span className="truncate">{l.product.name} × {l.qty}</span>
              <span className="shrink-0">{money(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border pt-2 text-sm text-ink-muted">
          <span>{itemCount} item(s)</span>
          <span>{money(subtotal)}</span>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Continue to payment
        </button>
      </div>
    </form>
  );
}
