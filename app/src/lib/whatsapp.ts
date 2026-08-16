import { business } from "../config/business";
import type { Product } from "../data/products";

/** Builds a wa.me deep link from a plain-text message. */
export function buildWhatsAppLink(message: string, number: string = business.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Product enquiry — carries product name, category and (optional) quantity/customization context. */
export function buildProductEnquiryMessage(
  product: Product,
  categoryName: string,
  opts?: { quantity?: number; customizationRequest?: string },
): string {
  const lines = [
    `Hi ${business.name}! I'm interested in this product:`,
    `• ${product.name} (${categoryName})`,
    `• Price shown: ₹${product.price} ${product.priceUnit}`,
  ];

  if (opts?.quantity) {
    lines.push(`• Quantity I need: ${opts.quantity}`);
  }
  if (opts?.customizationRequest) {
    lines.push(`• Customization request: ${opts.customizationRequest}`);
  }

  lines.push("Could you share more details and availability?");

  return lines.join("\n");
}

export interface BulkEnquiryFields {
  eventType: string;
  approxQuantity: string;
  preferredDate: string;
  budgetRange: string;
  productPreference: string;
  customizationRequirements: string;
  message: string;
}

/** Bulk/event enquiry — used by the Bulk Orders page form. */
export function buildBulkEnquiryMessage(fields: BulkEnquiryFields): string {
  const lines = [`Hi ${business.name}! I'd like a quote for a bulk/event order.`, ""];

  if (fields.eventType) lines.push(`• Event type: ${fields.eventType}`);
  if (fields.approxQuantity) lines.push(`• Approx. quantity: ${fields.approxQuantity}`);
  if (fields.preferredDate) lines.push(`• Preferred date: ${fields.preferredDate}`);
  if (fields.budgetRange) lines.push(`• Budget range: ${fields.budgetRange}`);
  if (fields.productPreference) lines.push(`• Product preference: ${fields.productPreference}`);
  if (fields.customizationRequirements)
    lines.push(`• Customization requirements: ${fields.customizationRequirements}`);
  if (fields.message) {
    lines.push("");
    lines.push(`Additional message: ${fields.message}`);
  }

  return lines.join("\n");
}
