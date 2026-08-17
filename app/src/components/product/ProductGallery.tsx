"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import type { CatProduct } from "@/lib/catalog-types";

export function ProductGallery({ product }: { product: CatProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (product.images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-border bg-canvas-deep/30 text-ink-faint">
        <Package className="h-12 w-12" aria-hidden="true" />
      </div>
    );
  }

  const active = product.images[Math.min(activeIndex, product.images.length - 1)];

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active} alt={product.name} className="aspect-square w-full object-cover" />
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
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                i === activeIndex ? "border-primary" : "border-transparent hover:border-border-strong"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
