import type { ReactNode } from "react";
import Link from "next/link";
import { isLoggedIn } from "@/lib/admin-auth";
import { LogoutButton } from "./LogoutButton";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/help", label: "Help" },
];

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    return <div className="min-h-screen bg-canvas">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-border bg-surface">
        <div className="container-page flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-display text-sm font-semibold text-ink">Gifties For You — Admin</span>
            <nav className="hidden gap-4 sm:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-sm text-ink-muted hover:text-primary">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-ink-faint hover:text-primary">
              View site
            </Link>
            <LogoutButton />
          </div>
        </div>
        <nav className="container-page flex gap-4 overflow-x-auto border-t border-border/60 py-2 text-sm sm:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="shrink-0 text-ink-muted hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
