"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import type { CatProduct, CatCategory } from "@/lib/catalog-types";
import { money } from "@/lib/site";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, category }: { product: CatProduct; category?: CatCategory }) {
  const { qty, setQty } = useCart();
  const inCart = qty[product.id] ?? 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:shadow-raised">
      <Link href={`/product/${product.slug}`} className="group flex flex-1 flex-col">
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-canvas-deep/30">
          {product.featured && (
            <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
              Popular
            </span>
          )}
          {product.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-faint">
              <Package className="h-10 w-10" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
          <div>
            {category && (
              <span className="text-[11px] font-bold tracking-wider text-secondary uppercase">
                {category.name}
              </span>
            )}
            <h3 className="mt-1 font-display text-base leading-snug font-semibold text-ink transition-colors group-hover:text-primary">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-ink-faint">Min. order: {product.minOrderQty}+ units</p>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
            <span className="text-base font-bold text-ink">
              {money(product.price)}{" "}
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

      <div className="p-3 pt-0">
        {inCart > 0 ? (
          <div className="flex items-center justify-between rounded-full border border-primary bg-primary-soft/40 px-3 py-2 text-sm font-semibold text-primary">
            <button
              type="button"
              onClick={() => setQty(product.id, Math.max(0, inCart - 1))}
              className="h-6 w-6 rounded-full hover:bg-primary/10"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{inCart} in cart</span>
            <button
              type="button"
              onClick={() => setQty(product.id, inCart + 1)}
              className="h-6 w-6 rounded-full hover:bg-primary/10"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setQty(product.id, product.minOrderQty)}
            className="w-full rounded-full bg-primary py-2 text-sm font-semibold text-ink-on-primary transition-colors hover:bg-primary-dark"
          >
            Add {product.minOrderQty} to cart
          </button>
        )}
      </div>
    </div>
  );
}
