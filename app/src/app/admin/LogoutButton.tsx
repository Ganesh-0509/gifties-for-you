import { destroySession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export function LogoutButton() {
  async function logout() {
    "use server";
    await destroySession();
    redirect("/admin/login");
  }

  return (
    <form action={logout}>
      <button type="submit" className="text-xs font-medium text-ink-muted hover:text-error">
        Log out
      </button>
    </form>
  );
}
