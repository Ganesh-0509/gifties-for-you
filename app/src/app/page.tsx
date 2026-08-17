import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { getCatalog, getSettings } from "@/lib/catalog";
import { publicSite, waLinkTo } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProductCard } from "@/components/product/ProductCard";
import { OCCASIONS } from "@/lib/catalog-types";

export default async function Home() {
  const [catalog, settings] = await Promise.all([getCatalog(), getSettings()]);
  const site = publicSite(settings);
  const featured = catalog.products.filter((p) => p.active && p.featured).slice(0, 8);
  const enquiryLink = waLinkTo(site.whatsapp, `Hi ${site.name}! I have a question about your gifts.`);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-canvas">
        <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <span className="tag-punch inline-flex items-center rounded-tag bg-secondary-soft py-1.5 pr-4 pl-6 text-xs font-semibold tracking-wide text-secondary uppercase shadow-sm">
              Bespoke Return Gifts &amp; Celebration Hampers
            </span>
            <h1 className="mt-4 text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl lg:text-6xl">
              Bespoke gifts for every celebration
            </h1>
            <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg">
              {site.shortDescription} Browse by occasion or category, add what you need to the
              cart, and check out securely online.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-ink-on-primary shadow-md transition-colors hover:bg-primary-dark"
              >
                Shop the catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <WhatsAppButton href={enquiryLink} size="lg" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/80 pt-4 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" /> Secure online payment
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Truck className="h-4 w-4 text-secondary" aria-hidden="true" /> Chennai delivery &amp; pickup
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {catalog.categories.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                href={`/shop?category=${c.id}`}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border shadow-card"
              >
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="container-page py-12 sm:py-16">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">What are you celebrating?</h2>
        <p className="mt-2 text-ink-muted">Start from the occasion and we&rsquo;ll narrow the catalogue for you.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {OCCASIONS.map((o) => (
            <Link
              key={o.id}
              href={`/shop?occasion=${o.id}`}
              className="rounded-2xl border border-border bg-surface p-5 text-center shadow-card transition-shadow hover:shadow-raised"
            >
              <span className="font-display text-sm font-semibold text-ink">{o.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-border bg-canvas-deep/40 py-12 sm:py-16">
        <div className="container-page">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Popular picks</h2>
            <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((p) => {
              const category = catalog.categories.find((c) => c.id === p.categoryId);
              return <ProductCard key={p.id} product={p} category={category} />;
            })}
          </div>
        </div>
      </section>

      {/* Bulk orders CTA */}
      <section className="container-page py-12 sm:py-16">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card sm:p-12">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Planning a wedding or a big event?</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-muted">
            Bulk and event orders are handled personally — tell us your quantity, customization and
            timeline over WhatsApp and we&rsquo;ll put together a quote.
          </p>
          <Link
            href="/bulk-orders"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
          >
            Get a bulk quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
