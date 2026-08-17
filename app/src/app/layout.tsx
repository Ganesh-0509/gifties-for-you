import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";

export const dynamic = "force-dynamic";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const site = publicSite(settings);
  return {
    title: site.metaTitle,
    description: site.metaDescription,
    robots: site.pricesAreProvisional ? { index: false, follow: false } : undefined,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header site={site} />
          <main className="flex-1">{children}</main>
          <Footer site={site} />
        </CartProvider>
      </body>
    </html>
  );
}
