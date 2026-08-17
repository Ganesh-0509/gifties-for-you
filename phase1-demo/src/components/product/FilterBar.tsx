import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CATEGORIES,
  OCCASIONS,
  PRICE_BANDS,
  getCategory,
  getOccasion,
  type CategoryId,
  type OccasionId,
  type PriceBandId,
} from "../../data/products";

export interface ShopFilters {
  category: CategoryId | null;
  occasion: OccasionId | null;
  priceBand: PriceBandId | null;
  query: string;
}

export function FilterBar({
  filters,
  onChange,
}: {
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
}) {
  const hasActiveFilters = Boolean(
    filters.category || filters.occasion || filters.priceBand || filters.query.trim()
  );

  const activeCategoryObj = filters.category ? getCategory(filters.category) : null;
  const activeOccasionObj = filters.occasion ? getOccasion(filters.occasion) : null;
  const activePriceBandObj = PRICE_BANDS.find((b) => b.id === filters.priceBand);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-5 sm:p-6 shadow-card transition-all">
      {/* Top Search Bar & Quick Count Strip */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-4">
        <div className="relative flex-1 max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="Search return gifts, diya sets, hampers..."
            aria-label="Search products"
            className="w-full rounded-full border border-border-strong bg-canvas py-2.5 pr-10 pl-10 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {filters.query && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, query: "" })}
              className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-ink-faint hover:text-ink flex items-center justify-center rounded-full hover:bg-canvas-deep transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Interactive Catalogue Filters</span>
        </div>
      </div>

      {/* Categories Horizontal Pill Row */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-ink-faint uppercase">
          Category
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...filters, category: null })}
            className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              filters.category === null
                ? "bg-primary text-ink-on-primary shadow-sm"
                : "border border-border bg-canvas text-ink-muted hover:border-primary/50 hover:text-ink"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => {
            const isActive = filters.category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onChange({ ...filters, category: isActive ? null : c.id })}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-ink-on-primary shadow-sm"
                    : "border border-border bg-canvas text-ink-muted hover:border-primary/50 hover:text-ink"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasions Horizontal Pill Row */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-ink-faint uppercase">
          Occasion
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...filters, occasion: null })}
            className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              filters.occasion === null
                ? "bg-secondary text-white shadow-sm"
                : "border border-border bg-canvas text-ink-muted hover:border-secondary/50 hover:text-ink"
            }`}
          >
            All Occasions
          </button>
          {OCCASIONS.map((o) => {
            const isActive = filters.occasion === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => onChange({ ...filters, occasion: isActive ? null : o.id })}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-secondary text-white shadow-sm"
                    : "border border-border bg-canvas text-ink-muted hover:border-secondary/50 hover:text-ink"
                }`}
              >
                {o.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Band Horizontal Pill Row */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-ink-faint uppercase">
          Price Range
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...filters, priceBand: null })}
            className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              filters.priceBand === null
                ? "bg-ink text-white shadow-sm"
                : "border border-border bg-canvas text-ink-muted hover:border-ink/50 hover:text-ink"
            }`}
          >
            Any Price
          </button>
          {PRICE_BANDS.map((band) => {
            const isActive = filters.priceBand === band.id;
            return (
              <button
                key={band.id}
                type="button"
                onClick={() => onChange({ ...filters, priceBand: isActive ? null : band.id })}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-white shadow-sm"
                    : "border border-border bg-canvas text-ink-muted hover:border-ink/50 hover:text-ink"
                }`}
              >
                {band.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Removable Tags Bar */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-3 mt-1"
          >
            <span className="text-xs text-ink-faint font-semibold">Active filters:</span>

            {activeCategoryObj && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                Category: {activeCategoryObj.name}
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, category: null })}
                  className="hover:text-primary-dark"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {activeOccasionObj && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary-soft px-3 py-1 text-xs font-medium text-secondary">
                Occasion: {activeOccasionObj.name}
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, occasion: null })}
                  className="hover:text-secondary-dark"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {activePriceBandObj && (
              <span className="inline-flex items-center gap-1 rounded-full bg-canvas-deep px-3 py-1 text-xs font-medium text-ink">
                Price: {activePriceBandObj.label}
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, priceBand: null })}
                  className="hover:text-ink-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {filters.query && (
              <span className="inline-flex items-center gap-1 rounded-full bg-canvas-deep px-3 py-1 text-xs font-medium text-ink">
                Query: "{filters.query}"
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, query: "" })}
                  className="hover:text-ink-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={() => onChange({ category: null, occasion: null, priceBand: null, query: "" })}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <RotateCcw className="h-3 w-3" />
              Reset All
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
