import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getOrder, parseItems, type OrderStatus } from "@/lib/db";
import { StatusPill } from "@/components/admin/StatusPill";
import { money } from "@/lib/site";
import { OrderActions } from "./OrderActions";
import { saveNoteAction } from "./actions";

export default async function AdminOrderDetail(props: PageProps<"/admin/orders/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const order = await getOrder(id);
  if (!order) notFound();

  const items = parseItems(order.itemsJson);

  return (
    <div>
      <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-primary">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-mono font-display text-2xl font-semibold text-ink">{order.id}</h1>
          <p className="text-sm text-ink-faint">{new Date(order.createdAt).toLocaleString("en-IN")}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="mt-4">
        <OrderActions
          orderId={order.id}
          status={order.status as OrderStatus}
          canRefund={order.status === "paid" || order.status === "confirmed" || order.status === "packing" || order.status === "ready" || order.status === "dispatched" || order.status === "delivered"}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-sm font-semibold text-ink">Customer</p>
          <dl className="mt-2 space-y-1 text-sm text-ink-muted">
            <div className="flex justify-between"><dt>Name</dt><dd className="text-ink">{order.customerName}</dd></div>
            <div className="flex justify-between"><dt>Phone</dt><dd className="text-ink">{order.phone}</dd></div>
            {order.email && <div className="flex justify-between"><dt>Email</dt><dd className="text-ink">{order.email}</dd></div>}
            <div className="flex justify-between"><dt>Delivery</dt><dd className="text-ink capitalize">{order.deliveryMethod}</dd></div>
            {order.deliveryMethod === "delivery" && (
              <>
                <div className="flex justify-between gap-4"><dt>Address</dt><dd className="text-right text-ink">{order.addressLine}</dd></div>
                <div className="flex justify-between"><dt>City</dt><dd className="text-ink">{order.city}</dd></div>
                {order.area && <div className="flex justify-between"><dt>Area</dt><dd className="text-ink">{order.area}</dd></div>}
                <div className="flex justify-between"><dt>Pincode</dt><dd className="text-ink">{order.pincode}</dd></div>
              </>
            )}
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-sm font-semibold text-ink">Payment</p>
          <dl className="mt-2 space-y-1 text-sm text-ink-muted">
            {order.razorpayPaymentId ? (
              <>
                <div className="flex justify-between"><dt>Payment ID</dt><dd className="font-mono text-xs text-ink">{order.razorpayPaymentId}</dd></div>
                <div className="flex justify-between"><dt>Method</dt><dd className="text-ink capitalize">{order.paymentMethod ?? "—"}</dd></div>
              </>
            ) : (
              <p className="text-ink-faint">No payment recorded yet.</p>
            )}
            <div className="flex justify-between border-t border-border pt-1"><dt>Subtotal</dt><dd className="text-ink">{money(order.subtotal)}</dd></div>
            {order.discount > 0 && <div className="flex justify-between"><dt>Discount</dt><dd className="text-ink">−{money(order.discount)}</dd></div>}
            {order.shippingFee > 0 && <div className="flex justify-between"><dt>Delivery</dt><dd className="text-ink">{money(order.shippingFee)}</dd></div>}
            <div className="flex justify-between text-base font-bold text-ink"><dt>Total</dt><dd>{money(order.grandTotal)}</dd></div>
          </dl>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-surface p-4 shadow-card">
        <p className="text-sm font-semibold text-ink">Items</p>
        <table className="mt-2 w-full text-sm">
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-1.5 text-ink">{item.name}</td>
                <td className="py-1.5 text-ink-muted">× {item.qty}</td>
                <td className="py-1.5 text-right text-ink">{money(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-surface p-4 shadow-card">
        <p className="text-sm font-semibold text-ink">Admin note</p>
        <form action={saveNoteAction} className="mt-2 flex gap-2">
          <input type="hidden" name="orderId" value={order.id} />
          <textarea
            name="adminNote"
            defaultValue={order.adminNote ?? ""}
            rows={2}
            placeholder="Private note — not shown to the customer"
            className="flex-1 rounded-md border border-border bg-canvas px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button type="submit" className="self-start rounded-md border border-border-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-canvas-deep/40">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
