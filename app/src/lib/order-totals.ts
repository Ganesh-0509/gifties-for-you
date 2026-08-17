// "Server owns every number" — the client sends only {id, qty} pairs; every
// price, subtotal and the grand total is recomputed here from live D1 data.
// Never trust a client-sent amount.

import type { Catalog } from "./catalog-types";
import type { Settings } from "./site";
import type { OrderItem } from "./db";

export interface CartInput {
  id: string;
  qty: number;
}

export interface ComputedOrder {
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  discountLabel: string | null;
  shippingFee: number;
  grandTotal: number;
  error?: string;
}

export function computeOrderTotals(
  cart: CartInput[],
  catalog: Catalog,
  settings: Settings,
  deliveryMethod: "delivery" | "pickup",
): ComputedOrder {
  const byId = new Map(catalog.products.map((p) => [p.id, p]));
  const items: OrderItem[] = [];

  for (const line of cart) {
    const product = byId.get(line.id);
    if (!product || !product.active) {
      return { items: [], itemCount: 0, subtotal: 0, discount: 0, discountLabel: null, shippingFee: 0, grandTotal: 0, error: `Product ${line.id} is not available.` };
    }
    const qty = Math.floor(line.qty);
    if (!Number.isFinite(qty) || qty <= 0) {
      return { items: [], itemCount: 0, subtotal: 0, discount: 0, discountLabel: null, shippingFee: 0, grandTotal: 0, error: `Invalid quantity for ${product.name}.` };
    }
    if (qty < product.minOrderQty) {
      return { items: [], itemCount: 0, subtotal: 0, discount: 0, discountLabel: null, shippingFee: 0, grandTotal: 0, error: `${product.name} requires a minimum order of ${product.minOrderQty}.` };
    }
    if (product.stock !== -1 && qty > product.stock) {
      return { items: [], itemCount: 0, subtotal: 0, discount: 0, discountLabel: null, shippingFee: 0, grandTotal: 0, error: `${product.name} only has ${product.stock} in stock.` };
    }
    items.push({
      id: product.id,
      name: product.name,
      qty,
      unit: product.priceUnit,
      price: product.price,
      total: product.price * qty,
    });
  }

  if (items.length === 0) {
    return { items: [], itemCount: 0, subtotal: 0, discount: 0, discountLabel: null, shippingFee: 0, grandTotal: 0, error: "Your cart is empty." };
  }

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const discount = 0;
  const shippingFee = deliveryMethod === "delivery" ? settings.deliveryFeeChennai : 0;
  const taxable = Math.max(0, subtotal - discount);
  const gst = settings.gstPct > 0 ? Math.round((taxable * settings.gstPct) / 100) : 0;
  const grandTotal = taxable + gst + shippingFee;

  return { items, itemCount, subtotal, discount, discountLabel: null, shippingFee, grandTotal };
}
