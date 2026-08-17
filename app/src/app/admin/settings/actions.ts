"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, verifyLogin, setAdminPassword, createSession } from "@/lib/admin-auth";
import { saveSettings } from "@/lib/catalog";
import { isSafeImageDataUrl } from "@/lib/site";

export async function saveSettingsAction(formData: FormData): Promise<{ error?: string }> {
  await requireAdmin();

  const tagline = String(formData.get("tagline") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const addressLine = String(formData.get("addressLine") ?? "").trim();
  const hours = String(formData.get("hours") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const phoneDisplay = String(formData.get("phoneDisplay") ?? "").trim();
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim();
  const deliveryFeeChennai = Number(formData.get("deliveryFeeChennai") ?? 0);
  const pickupAvailable = formData.get("pickupAvailable") === "on";
  const gstPct = Number(formData.get("gstPct") ?? 0);
  const pricesAreProvisional = formData.get("pricesAreProvisional") === "on";
  const announcement = String(formData.get("announcement") ?? "").trim();
  const aboutStory = String(formData.get("aboutStory") ?? "").trim();
  const metaTitle = String(formData.get("metaTitle") ?? "").trim();
  const metaDescription = String(formData.get("metaDescription") ?? "").trim();
  const newLogo = String(formData.get("newLogo") ?? "");
  const currentLogo = String(formData.get("currentLogo") ?? "");

  if (!/^\d{10,15}$/.test(whatsapp)) return { error: "WhatsApp number must be digits only, with country code (e.g. 919876543210)." };
  if (!Number.isFinite(deliveryFeeChennai) || deliveryFeeChennai < 0) return { error: "Enter a valid delivery fee." };
  if (!Number.isFinite(gstPct) || gstPct < 0 || gstPct > 28) return { error: "Enter a valid GST percentage." };

  let logo = currentLogo;
  if (newLogo) {
    if (!isSafeImageDataUrl(newLogo)) return { error: "That file isn't a valid logo image." };
    logo = newLogo;
  }

  await saveSettings({
    tagline,
    shortDescription,
    email,
    addressLine,
    hours,
    whatsapp,
    phoneDisplay,
    instagramUrl,
    deliveryFeeChennai,
    pickupAvailable,
    gstPct,
    pricesAreProvisional,
    announcement,
    aboutStory,
    metaTitle,
    metaDescription,
    logo,
  });

  revalidatePath("/", "layout");
  return {};
}

export async function changePasswordAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!(await verifyLogin(currentPassword))) return { error: "Current password is incorrect." };
  if (newPassword.length < 8) return { error: "New password must be at least 8 characters." };
  if (newPassword !== confirmPassword) return { error: "New passwords don't match." };

  await setAdminPassword(newPassword);
  // The password change bumps the session version, invalidating every
  // existing cookie (including this one) — re-issue a fresh session so the
  // admin who just changed it isn't immediately logged out too. Other
  // devices/sessions stay logged out, which is the intended effect.
  await createSession();
  return { success: true };
}
