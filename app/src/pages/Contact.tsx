import { AtSign, MapPin, Clock, Phone, Mail } from "lucide-react";
import { business } from "../config/business";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { buildWhatsAppLink } from "../lib/whatsapp";

const CONTACT_ROWS = [
  { icon: Phone, label: "Phone", value: business.phoneDisplay, href: `tel:${business.whatsappNumber}` },
  { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
  { icon: MapPin, label: "Location", value: business.location },
  { icon: Clock, label: "Hours", value: business.hours },
];

export default function Contact() {
  const enquiryLink = buildWhatsAppLink(`Hi ${business.name}! I have a question.`);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-secondary uppercase">Contact</p>
        <h1 className="mt-2 text-3xl text-ink sm:text-4xl">Let's talk about your gifting</h1>
        <p className="mt-3 text-ink-muted">
          WhatsApp is the fastest way to reach us — send a message any time and we'll follow up.
        </p>
        <div className="mt-6">
          <WhatsAppButton href={enquiryLink} size="lg" />
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-xl gap-3">
        {CONTACT_ROWS.map((row) => {
          const content = (
            <>
              <row.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{row.label}</p>
                <p className="text-sm text-ink">{row.value}</p>
              </div>
            </>
          );

          return row.href ? (
            <a
              key={row.label}
              href={row.href}
              className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3.5 hover:border-primary"
            >
              {content}
            </a>
          ) : (
            <div key={row.label} className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3.5">
              {content}
            </div>
          );
        })}

        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3.5 hover:border-primary"
        >
          <AtSign aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">Instagram</p>
            <p className="text-sm text-ink">@gifties_for_you</p>
          </div>
        </a>
      </div>
    </div>
  );
}
