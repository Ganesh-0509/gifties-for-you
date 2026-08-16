import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "../data/faq";
import { business } from "../config/business";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { buildWhatsAppLink } from "../lib/whatsapp";

export default function FAQ() {
  const enquiryLink = buildWhatsAppLink(`Hi ${business.name}! I have a question that's not in your FAQ.`);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-secondary uppercase">FAQ</p>
        <h1 className="mt-2 text-3xl text-ink sm:text-4xl">Frequently asked questions</h1>
        <p className="mt-3 text-ink-muted">
          The most common questions about ordering, customization and payment. Don't see yours?
          Just ask.
        </p>

        <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-surface">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group p-5 open:bg-canvas-deep/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-ink marker:content-none">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-150 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-lg bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base text-ink">Still have a question?</p>
            <p className="mt-1 text-sm text-ink-muted">We're happy to talk it through on WhatsApp.</p>
          </div>
          <WhatsAppButton href={enquiryLink} />
        </div>
      </div>
    </div>
  );
}
