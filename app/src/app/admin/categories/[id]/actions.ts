"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { updateCategory } from "@/lib/catalog";
import { isSafeImageDataUrl } from "@/lib/site";

export async function saveCategoryAction(categoryId: string, formData: FormData): Promise<{ error?: string }> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const newImage = String(formData.get("newImage") ?? "");
  const currentImage = String(formData.get("currentImage") ?? "") || null;

  if (!name) return { error: "Name is required." };

  let image = currentImage;
  if (newImage) {
    if (!isSafeImageDataUrl(newImage)) return { error: "That file isn't a valid image." };
    image = newImage;
  }

  await updateCategory(categoryId, { name, description, image });
  revalidatePath(`/admin/categories/${categoryId}`);
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  revalidatePath("/");
  return {};
}
