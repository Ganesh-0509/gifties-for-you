import { STATUS_LABEL, type OrderStatus } from "@/lib/db";

const COLORS: Record<OrderStatus, string> = {
  pending_payment: "bg-canvas-deep text-ink-muted",
  paid: "bg-secondary-soft text-secondary",
  payment_failed: "bg-error-soft text-error",
  confirmed: "bg-primary-soft/60 text-primary",
  packing: "bg-primary-soft/60 text-primary",
  ready: "bg-primary-soft/60 text-primary",
  dispatched: "bg-success-soft text-success",
  delivered: "bg-success-soft text-success",
  cancelled: "bg-error-soft text-error",
  refunded: "bg-error-soft text-error",
};

export function StatusPill({ status }: { status: string }) {
  const s = status as OrderStatus;
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${COLORS[s] ?? "bg-canvas-deep text-ink-muted"}`}>
      {STATUS_LABEL[s] ?? status}
    </span>
  );
}
