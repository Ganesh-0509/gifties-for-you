import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getProductById, getCatalog } from "@/lib/catalog";
import { ProductEditor } from "./ProductEditor";

export default async function AdminProductDetail(props: PageProps<"/admin/products/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const [product, catalog] = await Promise.all([getProductById(id), getCatalog()]);
  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-primary">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to products
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">{product.name}</h1>

      <div className="mt-6 max-w-2xl">
        <ProductEditor product={product} categories={catalog.categories} />
      </div>
    </div>
  );
}
