"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { CatProduct } from "@/lib/catalog-types";

export function AddToCart({ product }: { product: CatProduct }) {
  const { qty, setQty } = useCart();
  const inCart = qty[product.id] ?? 0;
  const [pending, setPending] = useState(product.minOrderQty);

  if (inCart > 0) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-primary bg-primary-soft/40 px-4 py-2.5 text-sm font-semibold text-primary">
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
        <button
          type="button"
          onClick={() => setQty(product.id, 0)}
          className="text-sm text-ink-faint underline hover:text-error"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-full border border-border">
        <button
          type="button"
          onClick={() => setPending((v) => Math.max(product.minOrderQty, v - 1))}
          className="px-3 py-2.5 text-ink-muted hover:text-primary"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-10 px-2 text-center text-sm font-semibold text-ink">{pending}</span>
        <button
          type="button"
          onClick={() => setPending((v) => v + 1)}
          className="px-3 py-2.5 text-ink-muted hover:text-primary"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => setQty(product.id, pending)}
        className="flex-1 rounded-md bg-primary py-3 text-sm font-semibold text-ink-on-primary transition-colors hover:bg-primary-dark"
      >
        Add to cart
      </button>
    </div>
  );
}
