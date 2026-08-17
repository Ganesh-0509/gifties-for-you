"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Settings } from "@/lib/site";
import { fileToDataUrl } from "@/lib/image-file";
import { saveSettingsAction } from "./actions";

export function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>(settings.logo);
  const [newLogo, setNewLogo] = useState<string>("");

  async function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file, 600, 0.9);
    setLogoPreview(dataUrl);
    setNewLogo(dataUrl);
  }

  function submit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveSettingsAction(formData);
      if (res.error) setError(res.error);
      else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <form action={submit} className="space-y-8">
      <input type="hidden" name="currentLogo" value={settings.logo} />
      <input type="hidden" name="newLogo" value={newLogo} />

      <section>
        <h2 className="font-display text-lg font-semibold text-ink">Logo</h2>
        <label className="mt-2 flex h-20 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-border bg-surface text-xs text-ink-faint hover:border-primary">
          {logoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoPreview} alt="" className="h-full w-full object-contain p-2" />
          ) : (
            "+ Upload logo"
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
        </label>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink">Business info</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Tagline</span>
            <input name="tagline" defaultValue={settings.tagline} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Short description (used in meta &amp; hero)</span>
            <textarea name="shortDescription" defaultValue={settings.shortDescription} rows={2} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">WhatsApp number (digits only, with country code)</span>
            <input name="whatsapp" defaultValue={settings.whatsapp} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Phone (for display)</span>
            <input name="phoneDisplay" defaultValue={settings.phoneDisplay} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Email</span>
            <input name="email" type="email" defaultValue={settings.email} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Instagram URL</span>
            <input name="instagramUrl" defaultValue={settings.instagramUrl} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Address</span>
            <input name="addressLine" defaultValue={settings.addressLine} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Hours</span>
            <input name="hours" defaultValue={settings.hours} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink">Delivery &amp; pricing</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-ink">Delivery fee within Chennai (₹)</span>
            <input name="deliveryFeeChennai" type="number" min={0} step={1} defaultValue={settings.deliveryFeeChennai} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">GST % (0 if not applicable)</span>
            <input name="gstPct" type="number" min={0} max={28} step={0.5} defaultValue={settings.gstPct} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="pickupAvailable" defaultChecked={settings.pickupAvailable} />
            <span className="text-ink-muted">Store pickup available</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="pricesAreProvisional" defaultChecked={settings.pricesAreProvisional} />
            <span className="text-ink-muted">
              Prices are still provisional (keeps the site un-indexed and shows a notice) — turn this off once
              real prices are confirmed.
            </span>
          </label>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink">Site content</h2>
        <div className="mt-3 grid gap-4">
          <label className="block text-sm">
            <span className="font-medium text-ink">Announcement bar (blank to hide)</span>
            <input name="announcement" defaultValue={settings.announcement} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">About page story</span>
            <textarea name="aboutStory" defaultValue={settings.aboutStory} rows={4} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Meta title (SEO)</span>
            <input name="metaTitle" defaultValue={settings.metaTitle} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Meta description (SEO)</span>
            <textarea name="metaDescription" defaultValue={settings.metaDescription} rows={2} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
        </div>
      </section>

      {error && <p className="rounded-md bg-error-soft px-3 py-2 text-sm text-error">{error}</p>}
      {saved && !error && <p className="rounded-md bg-success-soft px-3 py-2 text-sm text-success">Saved.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
