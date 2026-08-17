import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";
import { BulkEnquiryForm } from "@/components/bulk/BulkEnquiryForm";

export const metadata = { title: "Bulk & event orders | Gifties For You" };

export default async function BulkOrders() {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Bulk &amp; event orders</h1>
        <p className="mt-2 text-ink-muted">
          Weddings, corporate gifting and large functions get a custom quote — quantity, customization
          and delivery timeline are negotiated directly with us over WhatsApp, not the online cart.
        </p>
      </div>
      <div className="mt-8 max-w-2xl">
        <BulkEnquiryForm whatsapp={site.whatsapp} />
      </div>
    </div>
  );
}
