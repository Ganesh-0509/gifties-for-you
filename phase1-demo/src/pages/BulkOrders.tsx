import { BulkEnquiryForm } from "../components/bulk/BulkEnquiryForm";
import { SectionHeading } from "../components/ui/SectionHeading";

export default function BulkOrders() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Functions & events"
          title="Bulk & custom order enquiry"
          description="For weddings, birthdays, housewarmings and corporate functions — tell us roughly what you need and we'll take it from there on WhatsApp."
        />
        <div className="mt-8">
          <BulkEnquiryForm />
        </div>
      </div>
    </div>
  );
}
