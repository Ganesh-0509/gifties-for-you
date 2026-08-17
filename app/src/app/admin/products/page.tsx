import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getCatalog } from "@/lib/catalog";
import { money } from "@/lib/site";

export default async function AdminProducts() {
  await requireAdmin();
  const catalog = await getCatalog();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Products</h1>
      <p className="mt-1 text-sm text-ink-muted">{catalog.products.length} products across {catalog.categories.length} categories.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-ink-faint uppercase">
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {catalog.products.map((p) => {
              const category = catalog.categories.find((c) => c.id === p.categoryId);
              return (
                <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-canvas-deep/20">
                  <td className="px-4 py-2.5">
                    <div className="h-10 w-10 overflow-hidden rounded-md bg-canvas-deep/40">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <Link href={`/admin/products/${p.id}`} className="font-medium text-primary hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-ink-muted">{category?.name ?? p.categoryId}</td>
                  <td className="px-4 py-2.5 text-ink">{money(p.price)}</td>
                  <td className="px-4 py-2.5 text-ink-muted">{p.stock === -1 ? "Unlimited" : p.stock}</td>
                  <td className="px-4 py-2.5">
                    <span className={p.active ? "text-success" : "text-error"}>{p.active ? "Yes" : "No"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
