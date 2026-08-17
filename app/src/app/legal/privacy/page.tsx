import { getSettings } from "@/lib/catalog";
import { publicSite } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Privacy Policy | Gifties For You" };

export default async function Privacy() {
  const settings = await getSettings();
  const site = publicSite(settings);

  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information {site.name} collects when you use this website and
        how it&rsquo;s used.
      </p>

      <h2>What we collect</h2>
      <p>
        When you place an order, we collect your name, phone number, email (if provided), and
        delivery address (if you choose delivery). Payment details (card/UPI/bank information) are
        collected and processed by Razorpay, our payment gateway — we never see or store your card
        or bank details ourselves.
      </p>

      <h2>How it&rsquo;s used</h2>
      <p>
        Your information is used to process and fulfill your order, contact you about it, and
        respond to enquiries. We don&rsquo;t sell your information to third parties.
      </p>

      <h2>Payment processing</h2>
      <p>
        Payments are handled by Razorpay Software Private Limited, a PCI-DSS compliant payment
        gateway. Razorpay&rsquo;s own privacy policy governs how they handle payment data.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy, or requests to access/delete your data, can be sent to{" "}
        {site.email} or via WhatsApp at {site.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
