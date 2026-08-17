import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { listOrders } from "@/lib/db";
import { StatusPill } from "@/components/admin/StatusPill";
import { money } from "@/lib/site";

export default async function AdminOrders() {
  await requireAdmin();
  const orders = await listOrders(300);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-8 text-ink-muted">No orders yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-ink-faint uppercase">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border/60 last:border-0 hover:bg-canvas-deep/20">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-mono font-semibold text-primary hover:underline">
                      {o.id}
                    </Link>
                    <p className="text-xs text-ink-faint">{new Date(o.createdAt).toLocaleDateString("en-IN")}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-ink">{o.customerName}</p>
                    <p className="text-xs text-ink-faint">{o.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{o.itemCount}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{money(o.grandTotal)}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
