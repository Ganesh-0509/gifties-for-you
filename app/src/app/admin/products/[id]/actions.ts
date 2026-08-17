"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { updateProduct, addProductPhoto, removeProductImage } from "@/lib/catalog";
import { OCCASIONS, type OccasionId } from "@/lib/catalog-types";

export async function saveProductAction(productId: string, formData: FormData): Promise<{ error?: string }> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const priceUnit = String(formData.get("priceUnit") ?? "per piece").trim();
  const price = Number(formData.get("price"));
  const minOrderQty = Number(formData.get("minOrderQty"));
  const customizable = formData.get("customizable") === "on";
  const customizationNote = String(formData.get("customizationNote") ?? "").trim() || null;
  const active = formData.get("active") === "on";
  const featured = formData.get("featured") === "on";
  const stockRaw = String(formData.get("stock") ?? "-1").trim();
  const stock = stockRaw === "" ? -1 : Number(stockRaw);
  const occasionIds = OCCASIONS.map((o) => o.id).filter((id) => formData.get(`occasion_${id}`) === "on") as OccasionId[];

  if (!name) return { error: "Name is required." };
  if (!Number.isFinite(price) || price < 0) return { error: "Enter a valid price." };
  if (!Number.isFinite(minOrderQty) || minOrderQty < 1) return { error: "Minimum order must be at least 1." };
  if (!Number.isFinite(stock)) return { error: "Enter a valid stock number, or -1 for unlimited." };

  await updateProduct(productId, {
    name,
    description,
    categoryId,
    occasionIds,
    price,
    priceUnit,
    minOrderQty,
    customizable,
    customizationNote,
    active,
    stock,
    featured,
  });

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  return {};
}

export async function uploadPhotoAction(productId: string, dataUrl: string): Promise<{ error?: string }> {
  await requireAdmin();
  try {
    await addProductPhoto(productId, dataUrl);
    revalidatePath(`/admin/products/${productId}`);
    revalidatePath("/shop");
    return {};
  } catch {
    return { error: "That file isn't a valid image." };
  }
}

export async function removePhotoAction(productId: string, imageUrl: string): Promise<void> {
  await requireAdmin();
  await removeProductImage(productId, imageUrl);
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/shop");
}
