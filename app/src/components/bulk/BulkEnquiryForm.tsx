import { useState } from "react";
import { CATEGORIES, OCCASIONS } from "../../data/products";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { buildBulkEnquiryMessage, buildWhatsAppLink, type BulkEnquiryFields } from "../../lib/whatsapp";
import { Sparkles } from "lucide-react";

const BUDGET_BANDS = [
  "Under ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000+",
  "Not sure yet",
];

const QUICK_QTY_CHIPS = ["25 Pcs", "50 Pcs", "100 Pcs", "250+ Pcs"];

const EMPTY: BulkEnquiryFields = {
  eventType: "",
  approxQuantity: "",
  preferredDate: "",
  budgetRange: "",
  productPreference: "",
  customizationRequirements: "",
  message: "",
};

export function BulkEnquiryForm() {
  const [fields, setFields] = useState<BulkEnquiryFields>(EMPTY);

  function update<K extends keyof BulkEnquiryFields>(key: K, value: BulkEnquiryFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const enquiryLink = buildWhatsAppLink(buildBulkEnquiryMessage(fields));
  const hasAnyInput = Object.values(fields).some((v) => v.trim().length > 0);

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
      {/* Quick Bulk Preset Banner */}
      <div className="mb-6 rounded-md bg-secondary-soft/50 p-4 border border-secondary-soft flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <Sparkles className="h-4 w-4 text-primary" />
          Quick Quantity Selectors:
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {QUICK_QTY_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => update("approxQuantity", chip)}
              className={`rounded-md border px-2.5 py-1 text-xs font-mono transition-all ${
                fields.approxQuantity === chip
                  ? "border-primary bg-primary text-white font-bold"
                  : "border-border bg-surface text-ink-muted hover:border-primary"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventType" className="text-sm font-medium text-ink">
            Event type
          </label>
          <select
            id="eventType"
            value={fields.eventType}
            onChange={(e) => update("eventType", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink focus:border-primary"
          >
            <option value="">Select an occasion</option>
            {OCCASIONS.map((o) => (
              <option key={o.id} value={o.name}>
                {o.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="approxQuantity" className="text-sm font-medium text-ink">
            Approximate quantity
          </label>
          <input
            id="approxQuantity"
            type="text"
            placeholder="e.g. 100 pieces"
            value={fields.approxQuantity}
            onChange={(e) => update("approxQuantity", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink font-mono font-semibold placeholder:text-ink-faint focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="preferredDate" className="text-sm font-medium text-ink">
            Preferred date
          </label>
          <input
            id="preferredDate"
            type="date"
            value={fields.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="budgetRange" className="text-sm font-medium text-ink">
            Rough budget range
          </label>
          <select
            id="budgetRange"
            value={fields.budgetRange}
            onChange={(e) => update("budgetRange", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink focus:border-primary"
          >
            <option value="">Select a range</option>
            {BUDGET_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="productPreference" className="text-sm font-medium text-ink">
            Product preference
          </label>
          <select
            id="productPreference"
            value={fields.productPreference}
            onChange={(e) => update("productPreference", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink focus:border-primary"
          >
            <option value="">Not sure yet — open to suggestions</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="customizationRequirements" className="text-sm font-medium text-ink">
            Customization requirements <span className="text-ink-faint">(optional)</span>
          </label>
          <input
            id="customizationRequirements"
            type="text"
            placeholder="e.g. names to print on tag, ribbon color..."
            value={fields.customizationRequirements}
            onChange={(e) => update("customizationRequirements", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-ink">
            Anything else we should know? <span className="text-ink-faint">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Tell us more about the function..."
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            className="mt-1.5 w-full resize-none rounded-md border border-border-strong bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <WhatsAppButton
          href={enquiryLink}
          size="lg"
          label={hasAnyInput ? "Send this enquiry on WhatsApp" : "Enquire on WhatsApp"}
          className="w-full"
        />
        <p className="mt-2 text-xs text-ink-faint text-center">
          Launches WhatsApp directly with all details pre-filled — zero manual typing required!
        </p>
      </div>
    </div>
  );
}
