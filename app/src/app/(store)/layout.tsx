import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <CartProvider>
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </CartProvider>
  );
}
