"use client";

import { useState } from "react";
import { waLinkTo } from "@/lib/site";
import { buildBulkOrderMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function BulkEnquiryForm({ whatsapp }: { whatsapp: string }) {
  const [productName, setProductName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [quantity, setQuantity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [customization, setCustomization] = useState("");
  const [notes, setNotes] = useState("");

  const link = waLinkTo(
    whatsapp,
    buildBulkOrderMessage({ productName, occasion, quantity, eventDate, customization, notes }),
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-ink">Product / category</span>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Return gift combos"
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Occasion</span>
          <input
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            placeholder="e.g. Wedding"
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Quantity</span>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 150 pieces"
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Event date (if known)</span>
          <input
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            placeholder="e.g. 12 Dec 2026"
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-ink">Customization needed</span>
          <input
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
            placeholder="e.g. names printed on tags"
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-ink">Anything else?</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
      </div>

      <div className="mt-6">
        <WhatsAppButton href={link} size="lg" label="Send this as a WhatsApp message" />
        <p className="mt-2 text-xs text-ink-faint">
          Fill in what you can — this just pre-fills a WhatsApp message so you don&rsquo;t have to type it
          all again. Nothing is sent until you tap send in WhatsApp.
        </p>
      </div>
    </div>
  );
}
