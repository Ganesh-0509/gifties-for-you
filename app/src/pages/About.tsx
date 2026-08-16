import { AtSign } from "lucide-react";
import { business } from "../config/business";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { CATEGORIES } from "../data/products";

export default function About() {
  const enquiryLink = buildWhatsAppLink(`Hi ${business.name}! I'd love to know more about your gifts.`);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-secondary uppercase">About</p>
        <h1 className="mt-2 text-3xl text-ink sm:text-4xl">A small gifting studio, not a checkout queue</h1>

        <div className="mt-6 space-y-4 text-ink-muted">
          <p>
            {business.name} puts together return gifts, festive favors and celebration hampers —
            the kind of gifting that usually needs a real conversation, not a generic cart.
            That's why every product here leads to WhatsApp instead of a checkout page: it's
            easier to talk through quantities, customization and timelines with an actual person
            than to fill out a form and wait.
          </p>
          <p>
            The catalogue is organized around how people actually shop for this kind of gifting —
            by occasion, by budget, or by browsing categories like pooja gifting, personalized
            keepsakes and hampers. If something isn't listed, it's worth asking anyway — a lot of
            what's offered can be adjusted or customized on request.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-sm font-semibold text-ink">What we work with</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CATEGORIES.map((c, i) => {
              // An odd-length list otherwise leaves the last card orphaned
              // in the right column with empty space beside it — span it
              // full-width instead so it reads as a deliberate closing
              // item, not a layout accident.
              const isDanglingLast = i === CATEGORIES.length - 1 && CATEGORIES.length % 2 === 1;
              return (
                <li
                  key={c.id}
                  className={`rounded-md border border-border bg-surface px-4 py-3 ${isDanglingLast ? "sm:col-span-2" : ""}`}
                >
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{c.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <WhatsAppButton href={enquiryLink} size="lg" />
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3.5 text-sm font-semibold text-ink hover:bg-surface-raised"
          >
            <AtSign aria-hidden="true" className="h-4 w-4" />
            See more on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
