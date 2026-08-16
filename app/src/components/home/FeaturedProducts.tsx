import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../data/products";
import { ProductGrid } from "../product/ProductGrid";
import { SectionHeading } from "../ui/SectionHeading";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(8);
  if (featured.length === 0) return null;

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Popular picks" title="A few customer favorites" />
        <Link to="/shop" className="text-sm font-semibold text-primary hover:text-primary-dark">
          View full catalogue →
        </Link>
      </div>
      <div className="mt-8">
        <ProductGrid products={featured} />
      </div>
    </section>
  );
}
