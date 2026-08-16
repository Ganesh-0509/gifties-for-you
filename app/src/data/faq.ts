/**
 * FAQ content — written to be honest and generically useful, not to assert
 * unconfirmed business specifics as fact. Where a real policy (delivery
 * radius, exact payment method, turnaround time) isn't confirmed, the
 * answer says so and points to WhatsApp rather than inventing a number.
 * Update these once the client confirms real policies — see
 * clients/gifties-for-you/frontend-design/13-assets-and-content.md.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the catalogue, then tap \"Enquire on WhatsApp\" on any product — it opens a message pre-filled with the product, quantity and any customization you've noted. We'll confirm availability, final price and timeline with you directly over WhatsApp.",
  },
  {
    question: "How do I pay?",
    answer:
      "Once your order is confirmed over WhatsApp, we'll share simple payment options — typically UPI, with cash on pickup available for local orders. We'll always confirm the amount and method with you before you pay.",
  },
  {
    question: "Can I customize a product?",
    answer:
      "Many pieces can be personalized — names, colors, packaging or small design changes. Products marked \"Customizable\" support this, but it's always worth asking on any item — mention what you have in mind when you enquire and we'll confirm what's possible.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer:
      "Most items are sold in bulk-friendly quantities, shown as \"Min. order\" on each product — this is standard for return gifts and event favors. If you need a smaller quantity, ask us on WhatsApp; it may still be possible.",
  },
  {
    question: "Do you deliver, or is it pickup only?",
    answer:
      "Share your location when you enquire and we'll confirm whether we can deliver or if pickup works better — this depends on the order size and where you are.",
  },
  {
    question: "How long does an order take?",
    answer:
      "It depends on the item, any customization, and the quantity. We'll give you a clear timeline over WhatsApp before you confirm, so there are no surprises closer to your event.",
  },
  {
    question: "Do you take bulk or event orders?",
    answer:
      "Yes — that's most of what we do. Use the Bulk & Event Order page to tell us the occasion, approximate quantity, date and budget, and we'll put together options for you.",
  },
  {
    question: "Can I see more photos before ordering?",
    answer:
      "Of course — message us on WhatsApp with the product you're interested in and we're happy to share more photos or answer specific questions.",
  },
];
