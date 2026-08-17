import { getCatalog } from "@/lib/catalog";
import { CartView } from "@/components/cart/CartView";

export const metadata = { title: "Your cart | Gifties For You" };

export default async function CartPage() {
  const catalog = await getCatalog();
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Your cart</h1>
      <div className="mt-8">
        <CartView products={catalog.products} />
      </div>
    </div>
  );
}
