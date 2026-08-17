import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getCatalog } from "@/lib/catalog";
import { CategoryEditor } from "./CategoryEditor";

export default async function AdminCategoryDetail(props: PageProps<"/admin/categories/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const catalog = await getCatalog();
  const category = catalog.categories.find((c) => c.id === id);
  if (!category) notFound();

  return (
    <div>
      <Link href="/admin/categories" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-primary">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to categories
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">{category.name}</h1>
      <div className="mt-6 max-w-md">
        <CategoryEditor category={category} />
      </div>
    </div>
  );
}
