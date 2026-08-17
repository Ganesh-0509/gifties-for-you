import { useState } from "react";
import type { Product } from "../../data/products";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { asset } from "../../lib/asset";

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (product.images.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        <MediaPlaceholder categoryId={product.categoryId} label={product.name} className="aspect-square w-full" />
      </div>
    );
  }

  const active = product.images[Math.min(activeIndex, product.images.length - 1)];

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border">
        <img src={asset(active)} alt={product.name} className="aspect-square w-full object-cover" />
      </div>

      {product.images.length > 1 && (
        <div className="mt-3 flex gap-2" role="tablist" aria-label={`${product.name} photos`}>
          {product.images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Photo ${i + 1} of ${product.images.length}`}
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors duration-150 ${
                i === activeIndex ? "border-primary" : "border-transparent hover:border-border-strong"
              }`}
            >
              <img src={asset(src)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
