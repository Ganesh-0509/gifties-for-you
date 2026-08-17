import { MapPin, Clock, Phone } from "lucide-react";
import { getSettings } from "@/lib/catalog";
import { publicSite, telLinkTo, waLinkTo } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata = { title: "Contact | Gifties For You" };

export default async function Contact() {
  const settings = await getSettings();
  const site = publicSite(settings);
  const enquiryLink = waLinkTo(site.whatsapp, `Hi ${site.name}!`);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl text-ink sm:text-4xl">Get in touch</h1>
        <p className="mt-2 text-ink-muted">
          Questions about an order, a product, or want a custom quote? WhatsApp is the fastest way
          to reach us.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
            <Phone className="mt-0.5 h-5 w-5 text-secondary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Phone / WhatsApp</p>
              <a href={telLinkTo(site.whatsapp)} className="text-sm text-ink-muted hover:text-primary">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
            <MapPin className="mt-0.5 h-5 w-5 text-secondary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Location</p>
              <p className="text-sm text-ink-muted">{site.addressLine}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
            <Clock className="mt-0.5 h-5 w-5 text-secondary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Hours</p>
              <p className="text-sm text-ink-muted">{site.hours}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <WhatsAppButton href={enquiryLink} size="lg" />
        </div>
      </div>
    </div>
  );
}
