import { getCatalog, getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata = { title: "Checkout | Gifties For You" };

export default async function CheckoutPage() {
  const [catalog, settings] = await Promise.all([getCatalog(), getSettings()]);
  const site = publicSite(settings);

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Checkout</h1>
      {site.pricesAreProvisional && (
        <p className="mt-3 rounded-md bg-secondary-soft px-3 py-2 text-sm text-secondary">
          Prices shown are indicative and still being confirmed by the shop owner.
        </p>
      )}
      <div className="mt-8">
        <CheckoutFlow products={catalog.products} site={site} />
      </div>
    </div>
  );
}
