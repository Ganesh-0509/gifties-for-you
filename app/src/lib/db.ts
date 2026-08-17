import { drizzle } from "drizzle-orm/d1";
import { eq, desc } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";
import { orders } from "./schema";

export const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "payment_failed",
  "confirmed",
  "packing",
  "ready",
  "dispatched",
  "delivered",
  "cancelled",
  "refunded",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending_payment: "Pending payment",
  paid: "Paid",
  payment_failed: "Payment failed",
  confirmed: "Confirmed",
  packing: "Packing",
  ready: "Ready",
  dispatched: "Dispatched",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export const PROCESSING_STATUSES: OrderStatus[] = [
  "paid",
  "confirmed",
  "packing",
  "ready",
  "dispatched",
];

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  unit: string;
  price: number;
  total: number;
}

// Cloudflare bindings only exist at request time — never call this at module top level.
export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}

export function newOrderId(year: number): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `GFY${year}${rand}`;
}

export function parseItems(json: string): OrderItem[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function listOrders(limit = 300) {
  const db = getDb();
  return db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit).all();
}

export async function getOrder(id: string) {
  const db = getDb();
  const rows = await db.select().from(orders).where(eq(orders.id, id)).limit(1).all();
  return rows[0] ?? null;
}

export async function updateOrder(
  id: string,
  patch: Partial<{
    status: OrderStatus;
    adminNote: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paymentMethod: string;
  }>,
) {
  const db = getDb();
  await db.update(orders).set(patch).where(eq(orders.id, id)).run();
}

export function statusCounts(rows: { status: string }[]) {
  const counts: Record<string, number> = {};
  for (const r of rows) counts[r.status] = (counts[r.status] ?? 0) + 1;
  return counts;
}
