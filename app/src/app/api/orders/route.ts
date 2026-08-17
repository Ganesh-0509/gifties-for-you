export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getCatalog, getSettings } from "@/lib/catalog";
import { computeOrderTotals, type CartInput } from "@/lib/order-totals";
import { getDb, newOrderId } from "@/lib/db";
import { orders } from "@/lib/schema";

interface OrderRequestBody {
  customerName?: string;
  phone?: string;
  email?: string;
  deliveryMethod?: "delivery" | "pickup";
  addressLine?: string;
  city?: string;
  area?: string;
  pincode?: string;
  items?: CartInput[];
}

export async function POST(req: NextRequest) {
  let body: OrderRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const customerName = (body.customerName ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const deliveryMethod = body.deliveryMethod === "pickup" ? "pickup" : "delivery";
  const addressLine = (body.addressLine ?? "").trim();
  const city = (body.city ?? "").trim();
  const area = (body.area ?? "").trim();
  const pincode = (body.pincode ?? "").trim();
  const email = (body.email ?? "").trim();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }
  if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }
  if (deliveryMethod === "delivery" && (!addressLine || !city || !pincode)) {
    return NextResponse.json({ error: "Address, city and pincode are required for delivery." }, { status: 400 });
  }

  const [catalog, settings] = await Promise.all([getCatalog(), getSettings()]);
  const computed = computeOrderTotals(items, catalog, settings, deliveryMethod);
  if (computed.error) {
    return NextResponse.json({ error: computed.error }, { status: 400 });
  }

  const id = newOrderId(new Date().getFullYear());
  const db = getDb();
  await db
    .insert(orders)
    .values({
      id,
      createdAt: Date.now(),
      status: "pending_payment",
      customerName,
      phone,
      email: email || null,
      deliveryMethod,
      addressLine: deliveryMethod === "delivery" ? addressLine : null,
      city: deliveryMethod === "delivery" ? city : null,
      area: deliveryMethod === "delivery" ? area || null : null,
      pincode: deliveryMethod === "delivery" ? pincode : null,
      itemsJson: JSON.stringify(computed.items),
      itemCount: computed.itemCount,
      subtotal: computed.subtotal,
      discount: computed.discount,
      discountLabel: computed.discountLabel,
      shippingFee: computed.shippingFee,
      grandTotal: computed.grandTotal,
      source: "website",
    })
    .run();

  return NextResponse.json({ id, grandTotal: computed.grandTotal });
}
