import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Shipping Policy | Gifties For You" };

export default async function ShippingPolicy() {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <LegalPage title="Shipping Policy">
      <p>
        {site.pickupAvailable
          ? "We currently offer store pickup and delivery within Chennai."
          : "We currently offer delivery within Chennai."}{" "}
        Choose your preferred option at checkout.
      </p>

      <h2>Delivery area</h2>
      <p>
        Delivery is available within Chennai. If you&rsquo;re outside our delivery area, message us
        on WhatsApp before ordering to check if we can still help.
      </p>

      <h2>Delivery time</h2>
      <p>
        Most orders are ready within a few days of payment, depending on the products ordered and
        any customization requested. We&rsquo;ll keep you updated on your order status via
        phone/WhatsApp.
      </p>

      {site.pickupAvailable && (
        <>
          <h2>Store pickup</h2>
          <p>
            You&rsquo;ll be notified by phone/WhatsApp when your order is ready for pickup, along
            with our pickup address and hours ({site.hours}).
          </p>
        </>
      )}

      <h2>Contact</h2>
      <p>Delivery questions can be sent to {site.email} or WhatsApp {site.phoneDisplay}.</p>
    </LegalPage>
  );
}
