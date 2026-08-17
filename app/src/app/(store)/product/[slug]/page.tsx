import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getCatalog, getProductBySlug } from "@/lib/catalog";
import { money, waLinkTo } from "@/lib/site";
import { getOccasion } from "@/lib/catalog-types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCart } from "@/components/product/AddToCart";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProductCard } from "@/components/product/ProductCard";
import { buildProductEnquiryMessage } from "@/lib/whatsapp";
import { SITE } from "@/lib/site";

export default async function ProductDetail(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const [product, catalog] = await Promise.all([getProductBySlug(slug), getCatalog()]);
  if (!product) notFound();

  const category = catalog.categories.find((c) => c.id === product.categoryId);
  const related = catalog.products
    .filter((p) => p.id !== product.id && p.active && p.categoryId === product.categoryId)
    .slice(0, 4);

  const enquiryLink = waLinkTo(SITE.whatsapp, buildProductEnquiryMessage(product));

  return (
    <div className="container-page py-8 sm:py-12">
      <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-primary">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div>
          {category && (
            <span className="text-xs font-bold tracking-wider text-secondary uppercase">{category.name}</span>
          )}
          <h1 className="mt-1 text-3xl font-semibold text-ink sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.occasionIds.map((id) => {
              const occ = getOccasion(id);
              return occ ? (
                <span key={id} className="rounded-full bg-canvas-deep px-2.5 py-1 text-xs font-medium text-ink-muted">
                  {occ.name}
                </span>
              ) : null;
            })}
          </div>

          <p className="mt-4 text-3xl font-bold text-ink">
            {money(product.price)}{" "}
            <span className="text-base font-normal text-ink-faint">{product.priceUnit}</span>
          </p>
          <p className="mt-1 text-sm text-ink-faint">Minimum order: {product.minOrderQty} units</p>

          <p className="mt-5 text-ink-muted">{product.description}</p>

          {product.customizable && (
            <p className="mt-3 rounded-md bg-primary-soft/50 px-3 py-2 text-sm text-primary">
              Customizable — {product.customizationNote ?? "ask us about options"}
            </p>
          )}

          <div className="mt-6">
            <AddToCart product={product} />
          </div>

          <div className="mt-4">
            <WhatsAppButton href={enquiryLink} label="Ask a question on WhatsApp" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-ink">You might also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} category={category} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
