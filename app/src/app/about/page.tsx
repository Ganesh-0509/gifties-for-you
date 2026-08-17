import { AtSign } from "lucide-react";
import { getCatalog, getSettings } from "@/lib/catalog";
import { publicSite, waLinkTo } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata = { title: "About | Gifties For You" };

export default async function About() {
  const [catalog, settings] = await Promise.all([getCatalog(), getSettings()]);
  const site = publicSite(settings);
  const enquiryLink = waLinkTo(site.whatsapp, `Hi ${site.name}! I'd love to know more about your gifts.`);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-secondary uppercase">About</p>
        <h1 className="mt-2 text-3xl text-ink sm:text-4xl">A small gifting studio, made easy to order from</h1>

        <div className="mt-6 space-y-4 text-ink-muted">
          <p>
            {site.name} puts together return gifts, festive favors and celebration hampers. Browse
            the catalogue by occasion or category, add what you need to the cart, and pay online —
            no back-and-forth needed for everyday orders.
          </p>
          <p>
            For weddings, corporate gifting or anything with custom quantities, printing or a
            timeline to plan around, our{" "}
            <a href="/bulk-orders" className="text-primary underline">
              bulk &amp; event order
            </a>{" "}
            page hands that off to a real conversation on WhatsApp instead — that kind of order
            usually needs one anyway.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-sm font-semibold text-ink">What we work with</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {catalog.categories.map((c, i) => {
              const isDanglingLast = i === catalog.categories.length - 1 && catalog.categories.length % 2 === 1;
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
            href={site.instagramUrl}
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
