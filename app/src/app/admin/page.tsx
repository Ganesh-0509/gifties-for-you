import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { listOrders, statusCounts, STATUS_LABEL, PROCESSING_STATUSES, type OrderStatus } from "@/lib/db";
import { money } from "@/lib/site";

export default async function AdminDashboard() {
  await requireAdmin();

  const orders = await listOrders(300);
  const counts = statusCounts(orders);
  const revenue = orders
    .filter((o) => PROCESSING_STATUSES.includes(o.status as OrderStatus) || o.status === "delivered")
    .reduce((sum, o) => sum + o.grandTotal, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold text-ink-faint uppercase">Total orders</p>
          <p className="mt-1 text-2xl font-bold text-ink">{orders.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold text-ink-faint uppercase">Pending payment</p>
          <p className="mt-1 text-2xl font-bold text-ink">{counts.pending_payment ?? 0}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold text-ink-faint uppercase">Paid, unfulfilled</p>
          <p className="mt-1 text-2xl font-bold text-ink">{counts.paid ?? 0}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold text-ink-faint uppercase">Revenue (paid+)</p>
          <p className="mt-1 text-2xl font-bold text-ink">{money(revenue)}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4 shadow-card">
        <p className="text-sm font-semibold text-ink">Orders by status</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(STATUS_LABEL) as OrderStatus[]).map((s) => (
            <span key={s} className="rounded-full bg-canvas-deep px-3 py-1 text-xs text-ink-muted">
              {STATUS_LABEL[s]}: {counts[s] ?? 0}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/orders" className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark">
          View orders
        </Link>
        <Link href="/admin/products" className="rounded-md border border-border-strong px-4 py-2.5 text-sm font-semibold text-ink hover:bg-canvas-deep/40">
          Manage products
        </Link>
        <Link href="/admin/settings" className="rounded-md border border-border-strong px-4 py-2.5 text-sm font-semibold text-ink hover:bg-canvas-deep/40">
          Settings
        </Link>
      </div>
    </div>
  );
}
