import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Terms & Conditions | Gifties For You" };

export default async function Terms() {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <LegalPage title="Terms & Conditions">
      <p>
        These terms apply when you place an order with {site.name} through this website. By
        placing an order, you agree to them.
      </p>

      <h2>Orders</h2>
      <p>
        Adding items to your cart and completing checkout is an offer to buy at the price shown at
        checkout. We may contact you to confirm details (customization, delivery area) before an
        order is finalized. We reserve the right to decline or cancel an order — for example if a
        product is out of stock or a delivery area can&rsquo;t be served — in which case any
        payment already made will be refunded.
      </p>

      <h2>Pricing</h2>
      <p>
        Prices are shown in Indian Rupees (₹) and may change without notice. The price charged is
        the one shown at the time you complete checkout.
      </p>

      <h2>Bulk &amp; event orders</h2>
      <p>
        Bulk and event orders are quoted and confirmed individually over WhatsApp, not through the
        online cart — separate terms (price, quantity, timeline) apply as agreed in that
        conversation.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to {site.email} or via WhatsApp at {site.phoneDisplay}.</p>
    </LegalPage>
  );
}
