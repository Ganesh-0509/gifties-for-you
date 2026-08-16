import { useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import type { Product } from "../../data/products";
import { getCategory, getOccasion } from "../../data/products";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { formatPrice } from "../../lib/format";
import { ThreeDCard } from "../ui/ThreeDCard";
import { BulkOrderModal } from "./BulkOrderModal";

export function ProductCard({ product }: { product: Product }) {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const category = getCategory(product.categoryId);
  const primaryOccasion = getOccasion(product.occasionIds[0]);

  return (
    <>
      <ThreeDCard maxTilt={8} className="flex flex-col border border-border bg-surface rounded-2xl overflow-hidden shadow-card hover:shadow-card-raised transition-all duration-300 h-full">
        <Link
          to={`/product/${product.slug}`}
          className="group flex flex-col flex-1 h-full"
        >
          {/* Card Image Thumbnail - Fixed Aspect Ratio */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas-deep/30 shrink-0">
            {product.featured && (
              <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
                Popular
              </span>
            )}
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <MediaPlaceholder categoryId={product.categoryId} label={product.name} className="h-full w-full" />
            )}
          </div>

          {/* Card Content Info - Fixed Layout Slots for Equal Length */}
          <div className="flex flex-1 flex-col p-3.5 sm:p-4 justify-between">
            <div>
              {/* Category & Occasion Tags Slot (Fixed Height) */}
              <div className="flex flex-wrap items-center gap-1.5 min-h-[1.5rem] mb-1">
                {category && (
                  <span className="text-[11px] font-bold tracking-wider text-secondary uppercase">
                    {category.name}
                  </span>
                )}
                {primaryOccasion && (
                  <span className="rounded-full bg-canvas-deep px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                    {primaryOccasion.name}
                    {product.occasionIds.length > 1 ? ` +${product.occasionIds.length - 1}` : ""}
                  </span>
                )}
              </div>

              {/* Title Slot (Fixed Height Slot for Uniform Alignment) */}
              <div className="min-h-[2.75rem] flex items-center">
                <h3 className="font-display text-base font-semibold leading-snug text-ink group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </div>

              {/* Min Order Slot */}
              <p className="text-xs text-ink-faint mt-1">
                Min. order: {product.minOrderQty}+ units
              </p>
            </div>

            {/* Price Row (Pushed to bottom of flex content container) */}
            <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-border/40">
              <span className="font-bold text-ink text-base">
                {formatPrice(product.price)}{" "}
                <span className="text-xs font-normal text-ink-faint">{product.priceUnit}</span>
              </span>

              {product.customizable && (
                <span className="rounded-full bg-primary-soft/80 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Custom Tag
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Quick Bulk Order Action Button (Aligned at bottom) */}
        <div className="p-3 pt-0 mt-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowBulkModal(true);
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-secondary-soft/80 py-2 px-3 text-xs font-semibold text-secondary hover:bg-primary hover:text-ink-on-primary transition-all duration-200 shadow-sm"
          >
            <Package className="h-3.5 w-3.5" />
            Quick Bulk Enquiry (25–250+ Pcs)
          </button>
        </div>
      </ThreeDCard>

      {/* Bulk Order Modal */}
      <BulkOrderModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        product={{
          id: product.id,
          title: product.name,
          image: product.images[0],
          categoryLabel: category?.name,
          price: `${formatPrice(product.price)} ${product.priceUnit}`,
        }}
      />
    </>
  );
}
