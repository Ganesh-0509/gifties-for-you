import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminHelp() {
  await requireAdmin();

  const items = [
    {
      q: "How do I change a product's price or details?",
      a: "Go to Products, click a product, edit the fields, and click Save. Changes go live immediately.",
    },
    {
      q: "How do I add or change a product photo?",
      a: "Open the product, use the photo box to upload a new picture from your phone or computer. The first photo shown is the main one customers see first.",
    },
    {
      q: "How do I see and manage orders?",
      a: "Go to Orders to see everything, newest first. Click an order to see customer details, what they bought, and the payment status. Use the status buttons to mark it packed, dispatched, delivered, etc.",
    },
    {
      q: "What if a customer wants a refund?",
      a: "Open the order and use the Refund button — this sends the money back to the customer's card/UPI automatically through Razorpay. Only works on orders that were actually paid.",
    },
    {
      q: "How do I change the delivery fee, WhatsApp number, or shop hours?",
      a: "Go to Settings — every business detail shown on the website lives there.",
    },
    {
      q: "How do I change my admin password?",
      a: "Go to Settings and use the \"Change password\" box near the bottom.",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink">Help</h1>
      <div className="mt-6 space-y-4">
        {items.map((i) => (
          <div key={i.q} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-semibold text-ink">{i.q}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{i.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
