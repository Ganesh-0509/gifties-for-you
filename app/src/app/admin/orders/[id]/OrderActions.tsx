"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setStatusAction, refundAction } from "./actions";
import type { OrderStatus } from "@/lib/db";

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus[]>> = {
  paid: ["confirmed"],
  confirmed: ["packing"],
  packing: ["ready"],
  ready: ["dispatched"],
  dispatched: ["delivered"],
};

const STATUS_BUTTON_LABEL: Record<string, string> = {
  confirmed: "Mark confirmed",
  packing: "Mark packing",
  ready: "Mark ready",
  dispatched: "Mark dispatched",
  delivered: "Mark delivered",
};

export function OrderActions({
  orderId,
  status,
  canRefund,
}: {
  orderId: string;
  status: OrderStatus;
  canRefund: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function advance(next: OrderStatus) {
    setError(null);
    startTransition(async () => {
      await setStatusAction(orderId, next);
      router.refresh();
    });
  }

  function cancel() {
    if (!confirm("Cancel this order?")) return;
    advance("cancelled");
  }

  function refund() {
    if (!confirm("Refund this payment via Razorpay? This cannot be undone.")) return;
    setError(null);
    startTransition(async () => {
      const res = await refundAction(orderId);
      if (res.error) setError(res.error);
      router.refresh();
    });
  }

  const nextOptions = NEXT_STATUS[status] ?? [];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {nextOptions.map((n) => (
        <button
          key={n}
          type="button"
          disabled={pending}
          onClick={() => advance(n)}
          className="rounded-md bg-primary px-3.5 py-2 text-xs font-semibold text-ink-on-primary hover:bg-primary-dark disabled:opacity-60"
        >
          {STATUS_BUTTON_LABEL[n] ?? n}
        </button>
      ))}
      {status !== "cancelled" && status !== "delivered" && status !== "refunded" && (
        <button
          type="button"
          disabled={pending}
          onClick={cancel}
          className="rounded-md border border-border-strong px-3.5 py-2 text-xs font-semibold text-ink-muted hover:bg-canvas-deep/40 disabled:opacity-60"
        >
          Cancel order
        </button>
      )}
      {canRefund && status !== "refunded" && (
        <button
          type="button"
          disabled={pending}
          onClick={refund}
          className="rounded-md border border-error px-3.5 py-2 text-xs font-semibold text-error hover:bg-error-soft disabled:opacity-60"
        >
          Refund via Razorpay
        </button>
      )}
      {error && <p className="w-full text-xs text-error">{error}</p>}
    </div>
  );
}
