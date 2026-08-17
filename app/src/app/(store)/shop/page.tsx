import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { OCCASIONS, type OccasionId } from "@/lib/catalog-types";

export const metadata = { title: "Shop the catalogue | Gifties For You" };

export default async function Shop(props: PageProps<"/shop">) {
  const params = await props.searchParams;
  const categoryFilter = typeof params.category === "string" ? params.category : "";
  const occasionFilter = typeof params.occasion === "string" ? (params.occasion as OccasionId) : "";

  const catalog = await getCatalog();
  const products = catalog.products.filter((p) => {
    if (!p.active) return false;
    if (categoryFilter && p.categoryId !== categoryFilter) return false;
    if (occasionFilter && !p.occasionIds.includes(occasionFilter)) return false;
    return true;
  });

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Shop the catalogue</h1>
      <p className="mt-2 text-ink-muted">
        Filter by category or occasion, add what you need to the cart, and check out online.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
            !categoryFilter
              ? "border-primary bg-primary text-ink-on-primary"
              : "border-border text-ink-muted hover:border-primary hover:text-primary"
          }`}
        >
          All categories
        </Link>
        {catalog.categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.id}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              categoryFilter === c.id
                ? "border-primary bg-primary text-ink-on-primary"
                : "border-border text-ink-muted hover:border-primary hover:text-primary"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={categoryFilter ? `/shop?category=${categoryFilter}` : "/shop"}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            !occasionFilter
              ? "border-secondary bg-secondary-soft text-secondary"
              : "border-border text-ink-faint hover:border-secondary hover:text-secondary"
          }`}
        >
          Any occasion
        </Link>
        {OCCASIONS.map((o) => {
          const href = categoryFilter
            ? `/shop?category=${categoryFilter}&occasion=${o.id}`
            : `/shop?occasion=${o.id}`;
          return (
            <Link
              key={o.id}
              href={href}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                occasionFilter === o.id
                  ? "border-secondary bg-secondary-soft text-secondary"
                  : "border-border text-ink-faint hover:border-secondary hover:text-secondary"
              }`}
            >
              {o.name}
            </Link>
          );
        })}
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-ink-muted">No products match this filter yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {products.map((p) => {
            const category = catalog.categories.find((c) => c.id === p.categoryId);
            return <ProductCard key={p.id} product={p} category={category} />;
          })}
        </div>
      )}
    </div>
  );
}
