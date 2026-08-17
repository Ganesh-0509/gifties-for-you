import { waLinkTo, money } from "./site";
import type { CatProduct } from "./catalog-types";

export function buildWhatsAppLink(whatsapp: string, message: string): string {
  return waLinkTo(whatsapp, message);
}

export function buildProductEnquiryMessage(product: CatProduct): string {
  return [
    `Hi! I'm interested in "${product.name}" (${money(product.price)} ${product.priceUnit}).`,
    `Could you share more details / availability?`,
  ].join(" ");
}

export interface BulkOrderRequest {
  productName?: string;
  occasion?: string;
  quantity?: string;
  customization?: string;
  eventDate?: string;
  notes?: string;
}

export function buildBulkOrderMessage(req: BulkOrderRequest): string {
  const lines = ["Hi! I'd like a bulk/event order quote."];
  if (req.productName) lines.push(`Product/category: ${req.productName}`);
  if (req.occasion) lines.push(`Occasion: ${req.occasion}`);
  if (req.quantity) lines.push(`Quantity: ${req.quantity}`);
  if (req.eventDate) lines.push(`Event date: ${req.eventDate}`);
  if (req.customization) lines.push(`Customization: ${req.customization}`);
  if (req.notes) lines.push(`Notes: ${req.notes}`);
  return lines.join("\n");
}
