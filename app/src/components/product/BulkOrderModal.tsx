import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Check, Package, Sparkles, Tag } from "lucide-react";
import { business } from "../../config/business";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export interface BulkProductItem {
  id: string;
  title: string;
  image?: string;
  categoryLabel?: string;
  price?: string | number;
}

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: BulkProductItem | null;
}

const BULK_TIERS = [
  { count: 25, label: "25 Pcs", badge: "Small Function" },
  { count: 50, label: "50 Pcs", badge: "Most Popular", highlight: true },
  { count: 100, label: "100 Pcs", badge: "Grand Event", savings: "Best Tier Rate" },
  { count: 250, label: "250+ Pcs", badge: "Corporate Bulk", savings: "Custom Wholesale" },
];

export function BulkOrderModal({ isOpen, onClose, product }: BulkOrderModalProps) {
  const [selectedQty, setSelectedQty] = useState<number>(50);
  const [customQty, setCustomQty] = useState<string>("");
  const [customTagText, setCustomTagText] = useState<string>("");
  const [needGiftBox, setNeedGiftBox] = useState<boolean>(true);

  if (!product) return null;

  const activeQuantity = customQty ? parseInt(customQty, 10) || 50 : selectedQty;

  const generateWhatsAppMsg = () => {
    let msg = `Hi ${business.name}! I want to place a BULK ORDER for:\n\n`;
    msg += `🎁 *Product*: ${product.title}\n`;
    msg += `📦 *Bulk Quantity*: ${activeQuantity} Pcs\n`;
    if (product.categoryLabel) msg += `🏷️ *Category*: ${product.categoryLabel}\n`;
    if (customTagText.trim()) msg += `✍️ *Custom Tag/Name*: "${customTagText.trim()}"\n`;
    if (needGiftBox) msg += `🎀 *Packing*: Custom Ribbon & Gift Box Combo\n`;
    msg += `\nPlease confirm pricing, stock availability, and estimated delivery schedule!`;
    return msg;
  };

  const whatsappUrl = buildWhatsAppLink(generateWhatsAppMsg());

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg bg-surface p-6 shadow-raised border border-border sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-ink-muted hover:bg-canvas hover:text-ink transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="tag-punch inline-flex items-center gap-1.5 rounded-tag bg-secondary-soft py-1 px-3 pl-5 text-xs font-semibold uppercase text-secondary">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Quick Bulk Order Enquiry
              </span>
            </div>

            <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Order {product.title} in Bulk
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Select your quantity bracket &amp; custom tag requirements. We'll assemble your WhatsApp order instantly!
            </p>

            {/* Selected Product Card Preview */}
            <div className="mt-4 flex items-center gap-4 rounded-md border border-border bg-canvas/60 p-3">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 rounded-md object-cover border border-border"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-secondary-soft text-secondary font-display text-lg">
                  <Package className="h-7 w-7" />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-ink text-base line-clamp-1">{product.title}</h4>
                <p className="text-xs text-ink-muted">
                  {product.categoryLabel || "Return Gift Collection"}
                  {product.price && <span className="ml-2 font-mono text-primary font-bold">{product.price}</span>}
                </p>
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-secondary font-medium">
                  <Check className="h-3 w-3 text-success" /> Pan-India Safe Delivery
                </div>
              </div>
            </div>

            {/* Quantity Brackets Selector */}
            <div className="mt-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink">
                1. Select Bulk Quantity Bracket
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {BULK_TIERS.map((tier) => {
                  const isSelected = !customQty && selectedQty === tier.count;
                  return (
                    <button
                      key={tier.count}
                      type="button"
                      onClick={() => {
                        setSelectedQty(tier.count);
                        setCustomQty("");
                      }}
                      className={`relative flex flex-col items-center justify-center rounded-md border py-3 px-2 text-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary-soft/30 text-primary ring-2 ring-primary/40 font-bold"
                          : "border-border bg-surface hover:border-border-strong text-ink"
                      }`}
                    >
                      {tier.highlight && (
                        <span className="absolute -top-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-ink-on-primary uppercase">
                          {tier.badge}
                        </span>
                      )}
                      <span className="text-base font-bold font-mono">{tier.label}</span>
                      <span className="text-[10px] text-ink-muted">{tier.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Or Custom Quantity */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs text-ink-muted">Or enter exact count:</span>
                <input
                  type="number"
                  placeholder="e.g. 75"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  className="w-28 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-ink focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Personalization Options */}
            <div className="mt-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary" />
                2. Custom Gift Tag or Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., 'With Best Compliments from Gupta Family'"
                value={customTagText}
                onChange={(e) => setCustomTagText(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none placeholder:text-ink-faint"
              />
            </div>

            {/* Custom Gift Packaging Checkbox */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="giftBoxCheck"
                checked={needGiftBox}
                onChange={(e) => setNeedGiftBox(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="giftBoxCheck" className="text-xs text-ink cursor-pointer">
                Include signature gift bags &amp; ribbon combo
              </label>
            </div>

            {/* Instant Action CTA */}
            <div className="mt-7 pt-4 border-t border-border flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-whatsapp px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-whatsapp-dark shadow-card"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                Send Instant Bulk Order on WhatsApp ({activeQuantity} Pcs)
              </a>
              <p className="text-center text-[11px] text-ink-muted">
                No forms or accounts needed. Launches WhatsApp directly with your pre-filled details!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
