import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Refund & Cancellation Policy | Gifties For You" };

export default async function RefundPolicy() {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <LegalPage title="Refund & Cancellation Policy">
      <p>
        Most of our products are made or packed to order, so please review your order carefully
        before paying.
      </p>

      <h2>Cancellations</h2>
      <p>
        If you need to cancel, contact us on WhatsApp as soon as possible. Orders that haven&rsquo;t
        yet been packed can usually be cancelled for a full refund; orders already in packing or
        dispatch may not be cancellable.
      </p>

      <h2>Refunds</h2>
      <p>
        If we&rsquo;re unable to fulfill your order (out of stock, delivery area not serviceable),
        you&rsquo;ll receive a full refund to your original payment method. Approved refunds are
        processed through Razorpay and typically reach your account within 5–7 business days,
        depending on your bank.
      </p>

      <h2>Damaged or incorrect items</h2>
      <p>
        If an item arrives damaged or isn&rsquo;t what you ordered, message us on WhatsApp with a
        photo within 48 hours of delivery and we&rsquo;ll sort out a replacement or refund.
      </p>

      <h2>Bulk &amp; event orders</h2>
      <p>Cancellation and refund terms for bulk/event orders are agreed individually at the time of quote.</p>

      <h2>Contact</h2>
      <p>
        For any cancellation or refund request, reach us at {site.email} or WhatsApp {site.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
