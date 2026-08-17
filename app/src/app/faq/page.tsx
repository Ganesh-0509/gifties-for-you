import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";

export const metadata = { title: "FAQ | Gifties For You" };

export default async function FAQ() {
  const settings = await getSettings();
  const site = publicSite(settings);

  const faqs = [
    {
      q: "How do I place an order?",
      a: "Add products to your cart from the Shop page, then check out and pay online by card, UPI or netbanking.",
    },
    {
      q: "What about large orders for weddings or events?",
      a: "Bulk and event orders are handled directly over WhatsApp so we can talk through quantity, customization and timeline — use the Bulk & Event Orders page to start that conversation.",
    },
    {
      q: "Do you deliver, or is it pickup only?",
      a: site.pickupAvailable
        ? "Both — store pickup is available, and delivery within Chennai can be selected at checkout."
        : "Delivery within Chennai can be selected at checkout.",
    },
    {
      q: "What payment methods do you accept?",
      a: "Cards, UPI and netbanking, all processed securely through Razorpay at checkout.",
    },
    {
      q: "Can I customize a product?",
      a: "Some products support customization (noted on the product page) — add any request in your order, or reach out on WhatsApp beforehand if you'd like to confirm details first.",
    },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl text-ink sm:text-4xl">Frequently asked questions</h1>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-semibold text-ink">{f.q}</p>
              <p className="mt-1.5 text-sm text-ink-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
