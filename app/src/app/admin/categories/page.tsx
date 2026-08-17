import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getCatalog } from "@/lib/catalog";

export default async function AdminCategories() {
  await requireAdmin();
  const catalog = await getCatalog();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Categories</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {catalog.categories.map((c) => (
          <Link
            key={c.id}
            href={`/admin/categories/${c.id}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-card hover:border-primary"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-canvas-deep/40">
              {c.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div>
              <p className="font-semibold text-ink">{c.name}</p>
              <p className="text-xs text-ink-muted">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
