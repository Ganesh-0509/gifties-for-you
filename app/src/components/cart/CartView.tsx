"use client";

import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import { useCart, cartTotals } from "@/lib/cart";
import { money } from "@/lib/site";
import type { CatProduct } from "@/lib/catalog-types";

export function CartView({ products }: { products: CatProduct[] }) {
  const { qty, setQty, ready } = useCart();

  if (!ready) return null;

  const { items, subtotal, itemCount } = cartTotals(qty, products);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-ink-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark"
        >
          Browse the catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {items.map((line) => (
          <div
            key={line.product.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-card"
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-canvas-deep/30">
              {line.product.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={line.product.images[0]} alt={line.product.name} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/product/${line.product.slug}`} className="font-display font-semibold text-ink hover:text-primary">
                {line.product.name}
              </Link>
              <p className="text-sm text-ink-faint">
                {money(line.product.price)} {line.product.priceUnit} · min {line.product.minOrderQty}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => setQty(line.product.id, Math.max(0, line.qty - 1))}
                    className="px-2.5 py-1 text-ink-muted hover:text-primary"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-8 px-1 text-center text-sm font-semibold">{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(line.product.id, line.qty + 1)}
                    className="px-2.5 py-1 text-ink-muted hover:text-primary"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setQty(line.product.id, 0)}
                  className="text-ink-faint hover:text-error"
                  aria-label={`Remove ${line.product.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="shrink-0 font-semibold text-ink">{money(line.lineTotal)}</p>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-xl border border-border bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>
        <div className="mt-4 flex justify-between text-sm text-ink-muted">
          <span>{itemCount} item(s)</span>
          <span>{money(subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-bold text-ink">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-ink-faint">Delivery/pickup and any applicable taxes are added at checkout.</p>
        <Link
          href="/checkout"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark"
        >
          Proceed to checkout <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
