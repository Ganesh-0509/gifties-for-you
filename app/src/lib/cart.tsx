"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CatProduct } from "./catalog-types";

const STORAGE_KEY = "gfy-cart-v1";

interface CartContextValue {
  qty: Record<string, number>;
  ready: boolean;
  setQty: (id: string, n: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQtyState] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage on mount — can't read it during
    // the initial render since it doesn't exist during SSR.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setQtyState(JSON.parse(raw));
    } catch {
      // ignore corrupt localStorage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(qty));
  }, [qty, ready]);

  function setQty(id: string, n: number) {
    setQtyState((prev) => {
      const next = { ...prev };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  }

  function clear() {
    setQtyState({});
  }

  return <CartContext.Provider value={{ qty, ready, setQty, clear }}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export interface CartLine {
  product: CatProduct;
  qty: number;
  lineTotal: number;
}

export function selectedItems(qty: Record<string, number>, all: CatProduct[]): CartLine[] {
  const byId = new Map(all.map((p) => [p.id, p]));
  const lines: CartLine[] = [];
  for (const [id, n] of Object.entries(qty)) {
    const product = byId.get(id);
    if (!product || n <= 0) continue;
    lines.push({ product, qty: n, lineTotal: product.price * n });
  }
  return lines;
}

export function cartTotals(qty: Record<string, number>, all: CatProduct[]) {
  const items = selectedItems(qty, all);
  const subtotal = items.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = items.reduce((sum, l) => sum + l.qty, 0);
  return { items, subtotal, itemCount };
}
