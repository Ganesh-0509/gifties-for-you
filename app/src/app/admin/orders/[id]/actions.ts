"use server";

import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireAdmin } from "@/lib/admin-auth";
import { getOrder, updateOrder, ORDER_STATUSES, type OrderStatus } from "@/lib/db";
import { refundRazorpayPayment } from "@/lib/razorpay";

export async function setStatusAction(orderId: string, status: OrderStatus) {
  await requireAdmin();
  if (!ORDER_STATUSES.includes(status)) throw new Error("Invalid status");
  await updateOrder(orderId, { status });
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function saveNoteAction(formData: FormData) {
  await requireAdmin();
  const orderId = String(formData.get("orderId") ?? "");
  const adminNote = String(formData.get("adminNote") ?? "");
  if (!orderId) return;
  await updateOrder(orderId, { adminNote });
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function refundAction(orderId: string): Promise<{ error?: string }> {
  await requireAdmin();
  const order = await getOrder(orderId);
  if (!order) return { error: "Order not found." };
  if (!order.razorpayPaymentId) return { error: "This order has no Razorpay payment to refund." };
  if (order.status === "refunded") return { error: "Already refunded." };

  const { env } = getCloudflareContext();
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    return { error: "Razorpay is not configured." };
  }

  try {
    await refundRazorpayPayment(env.RAZORPAY_KEY_ID, env.RAZORPAY_KEY_SECRET, order.razorpayPaymentId);
    await updateOrder(orderId, { status: "refunded" });
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");
    return {};
  } catch {
    return { error: "Refund failed. Try again or check the Razorpay dashboard directly." };
  }
}
