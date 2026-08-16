import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, Info, Package, Sparkles, Minus, Plus } from "lucide-react";
import { getProductBySlug, getCategory, getOccasion, getRelatedProducts } from "../data/products";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductGrid } from "../components/product/ProductGrid";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { SectionHeading } from "../components/ui/SectionHeading";
import { BulkOrderModal } from "../components/product/BulkOrderModal";
import { formatPrice } from "../lib/format";
import { buildProductEnquiryMessage, buildWhatsAppLink } from "../lib/whatsapp";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  return <ProductDetailView key={slug} slug={slug} />;
}

function ProductDetailView({ slug }: { slug: string | undefined }) {
  const product = slug ? getProductBySlug(slug) : undefined;

  const [quantity, setQuantity] = useState(product?.minOrderQty ?? 1);
  const [customizationRequest, setCustomizationRequest] = useState("");
  const [showBulkModal, setShowBulkModal] = useState(false);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const category = getCategory(product.categoryId);
  const enquiryMessage = buildProductEnquiryMessage(product, category?.name ?? "", {
    quantity,
    customizationRequest: customizationRequest.trim() || undefined,
  });
  const enquiryLink = buildWhatsAppLink(enquiryMessage);

  const related = getRelatedProducts(product);

  const BULK_PRESETS = [25, 50, 100, 250];

  return (
    <div className="container-page py-10 sm:py-14">
      <Link
        to="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-primary transition-colors"
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        Back to catalogue
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery product={product} />

        <div>
          {category && (
            <Link
              to={`/shop?category=${category.id}`}
              className="text-xs font-semibold tracking-wide text-secondary uppercase hover:text-primary"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-display font-semibold text-ink sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {product.occasionIds.map((occasionId) => {
              const occasion = getOccasion(occasionId);
              return occasion ? (
                <span
                  key={occasionId}
                  className="rounded-full bg-canvas-deep px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  {occasion.name}
                </span>
              ) : null;
            })}
          </div>

          <p className="mt-5 text-2xl font-semibold text-ink">
            {formatPrice(product.price)}{" "}
            <span className="text-sm font-normal text-ink-faint">{product.priceUnit}</span>
          </p>
          <p className="mt-1 text-sm text-ink-faint">
            Typical order size: {product.minOrderQty}+ {product.minOrderQty === 1 ? "piece" : "pieces"}
          </p>

          <p className="mt-5 text-ink-muted leading-relaxed">{product.description}</p>

          {product.customizable && (
            <div className="mt-4 flex gap-2 rounded-md border border-border-strong bg-secondary-soft/40 p-3 text-sm text-ink-muted">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <p>{product.customizationNote ?? "This product can be customized with custom tags and gift box packaging — ask us for details."}</p>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-border bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Enquire about this product</p>
              <button
                type="button"
                onClick={() => setShowBulkModal(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" /> Bulk Order Discounts
              </button>
            </div>

            {/* Quick Bulk Bracket Buttons */}
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-xs text-ink-muted">Quick Count:</span>
              {BULK_PRESETS.map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuantity(cnt)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-mono transition-all ${
                    quantity === cnt
                      ? "border-primary bg-primary-soft text-primary font-bold"
                      : "border-border bg-canvas text-ink-muted hover:border-border-strong"
                  }`}
                >
                  {cnt} Pcs
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="quantity" className="text-sm text-ink-muted">
                Exact Quantity
              </label>
              <div className="flex items-center rounded-md border border-border-strong">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-primary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="h-11 w-16 border-x border-border-strong bg-transparent text-center text-sm text-ink font-mono font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-primary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {product.customizable && (
              <div className="mt-4">
                <label htmlFor="customization" className="text-sm text-ink-muted">
                  Customization request <span className="text-ink-faint">(optional)</span>
                </label>
                <input
                  id="customization"
                  type="text"
                  value={customizationRequest}
                  onChange={(e) => setCustomizationRequest(e.target.value)}
                  placeholder="e.g. 'Priya & Rahul 25th Anniv' names on gift tag..."
                  className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-primary"
                />
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2">
              <WhatsAppButton href={enquiryLink} size="lg" className="w-full" />
              
              <button
                type="button"
                onClick={() => setShowBulkModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-secondary bg-secondary-soft py-3 px-4 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white transition-colors"
              >
                <Package className="h-4 w-4" />
                Configure Full Bulk Order (25–250+ Pcs with Custom Tags)
              </button>
            </div>

            <p className="mt-2 text-xs text-ink-faint text-center">
              Opens WhatsApp with pre-filled details — zero manual form typing required.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <SectionHeading title="You might also like" />
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </div>
      )}

      {/* Bulk Order Config Modal */}
      <BulkOrderModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        product={{
          id: product.id,
          title: product.name,
          image: product.images[0],
          categoryLabel: category?.name,
          price: `${formatPrice(product.price)} ${product.priceUnit}`,
        }}
      />
    </div>
  );
}
