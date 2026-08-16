import { MessageCircle } from "lucide-react";
import { business } from "../../config/business";
import { buildWhatsAppLink } from "../../lib/whatsapp";

/**
 * Persistent mobile-only WhatsApp affordance (see frontend-design/
 * 11-responsive-accessibility.md — the enquiry CTA should never require
 * scrolling to find on mobile). Hidden on desktop, where the header CTA
 * is already always visible.
 */
export function StickyWhatsApp() {
  const href = buildWhatsAppLink(`Hi ${business.name}! I have a question about your gifts.`);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-raised transition-transform duration-150 hover:scale-105 active:scale-95 md:hidden"
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
    </a>
  );
}
