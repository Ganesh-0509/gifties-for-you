import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PRODUCTS,
  PRICE_BANDS,
  type CategoryId,
  type OccasionId,
  type PriceBandId,
} from "../data/products";
import { FilterBar, type ShopFilters } from "../components/product/FilterBar";
import { ProductGrid } from "../components/product/ProductGrid";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { business } from "../config/business";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { Reveal } from "../components/ui/Reveal";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ShopFilters = {
    category: (searchParams.get("category") as CategoryId) || null,
    occasion: (searchParams.get("occasion") as OccasionId) || null,
    priceBand: (searchParams.get("price") as PriceBandId) || null,
    query: searchParams.get("q") || "",
  };

  function handleChange(next: ShopFilters) {
    const params = new URLSearchParams();
    if (next.category) params.set("category", next.category);
    if (next.occasion) params.set("occasion", next.occasion);
    if (next.priceBand) params.set("price", next.priceBand);
    if (next.query) params.set("q", next.query);
    setSearchParams(params, { replace: true });
  }

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === filters.priceBand);
    const q = filters.query.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      if (filters.category && p.categoryId !== filters.category) return false;
      if (filters.occasion && !p.occasionIds.includes(filters.occasion)) return false;
      if (band && (p.price < band.min || p.price >= band.max)) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const askDirectlyLink = buildWhatsAppLink(
    `Hi ${business.name}! I couldn't find what I was looking for on the site — could you help?`,
  );

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Header Section */}
      <Reveal>
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-secondary uppercase">
            Curated Catalogue
          </p>
          <h1 className="mt-1 text-3xl text-ink sm:text-4xl lg:text-5xl font-display font-semibold">
            Shop the catalogue
          </h1>
          <p className="mt-2 max-w-2xl text-ink-muted leading-relaxed">
            Filter by category, occasion or price range, then message us on WhatsApp about anything that catches your eye.
          </p>
        </div>
      </Reveal>

      {/* Top Filter Bar Container */}
      <Reveal delay={60}>
        <div className="mb-8">
          <FilterBar filters={filters} onChange={handleChange} />
        </div>
      </Reveal>

      {/* Expanded Widescreen Product Grid Section */}
      <Reveal delay={120}>
        <div>
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <p className="text-sm font-semibold text-ink-muted">
              Showing <span className="text-primary font-bold">{filtered.length}</span> {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>
          <ProductGrid
            products={filtered}
            emptyAction={<WhatsAppButton href={askDirectlyLink} label="Ask us directly" />}
          />
        </div>
      </Reveal>
    </div>
  );
}
