"use server";

import { redirect } from "next/navigation";
import { verifyLogin, createSession } from "@/lib/admin-auth";

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter your password." };

  const ok = await verifyLogin(password);
  if (!ok) return { error: "Incorrect password." };

  await createSession();
  redirect("/admin");
}
