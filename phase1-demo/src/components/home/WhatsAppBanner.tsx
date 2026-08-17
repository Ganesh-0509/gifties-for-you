import { Link } from "react-router-dom";
import { business } from "../../config/business";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export function WhatsAppBanner() {
  const enquiryLink = buildWhatsAppLink(`Hi ${business.name}! I have a question about your gifts.`);

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="tag-punch relative flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-primary-soft px-6 py-10 pl-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="bg-botanical absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative">
          <h2 className="text-2xl text-ink sm:text-3xl">Planning a function or event?</h2>
          <p className="mt-2 max-w-md text-ink-muted">
            Tell us the occasion, quantity and budget — we'll help you put together a return-gift
            or hamper order that fits.
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <Link
            to="/bulk-orders"
            className="inline-flex items-center justify-center rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-semibold text-ink hover:bg-surface-raised"
          >
            Start a bulk enquiry
          </Link>
          <WhatsAppButton href={enquiryLink} size="lg" />
        </div>
      </div>
    </section>
  );
}
