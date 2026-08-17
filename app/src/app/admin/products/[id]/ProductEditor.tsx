"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import type { CatProduct, CatCategory } from "@/lib/catalog-types";
import { OCCASIONS } from "@/lib/catalog-types";
import { fileToDataUrl } from "@/lib/image-file";
import { saveProductAction, uploadPhotoAction, removePhotoAction } from "./actions";

export function ProductEditor({ product, categories }: { product: CatProduct; categories: CatCategory[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function submit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveProductAction(product.id, formData);
      if (res.error) setError(res.error);
      else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await uploadPhotoAction(product.id, dataUrl);
      if (res.error) setError(res.error);
      router.refresh();
    } catch {
      setError("Could not process that image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(url: string) {
    if (!confirm("Remove this photo?")) return;
    startTransition(async () => {
      await removePhotoAction(product.id, url);
      router.refresh();
    });
  }

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-ink">Photos</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {product.images.map((url) => (
            <div key={url} className="group relative h-24 w-24 overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove photo"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border text-xs text-ink-faint hover:border-primary hover:text-primary">
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : "+ Add photo"}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
        <p className="mt-1 text-xs text-ink-faint">The first photo is the main one shown to customers.</p>
      </div>

      <form action={submit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Name</span>
            <input name="name" defaultValue={product.name} required className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Description</span>
            <textarea name="description" defaultValue={product.description} rows={3} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Category</span>
            <select name="categoryId" defaultValue={product.categoryId} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary">
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Price unit</span>
            <input name="priceUnit" defaultValue={product.priceUnit} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Price (₹)</span>
            <input name="price" type="number" min={0} step={1} defaultValue={product.price} required className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Minimum order quantity</span>
            <input name="minOrderQty" type="number" min={1} step={1} defaultValue={product.minOrderQty} required className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Stock (-1 = unlimited)</span>
            <input name="stock" type="number" step={1} defaultValue={product.stock} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-ink">Customization note (shown if customizable)</span>
            <input name="customizationNote" defaultValue={product.customizationNote ?? ""} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
        </div>

        <div>
          <span className="text-sm font-medium text-ink">Occasions</span>
          <div className="mt-2 flex flex-wrap gap-3">
            {OCCASIONS.map((o) => (
              <label key={o.id} className="flex items-center gap-1.5 text-sm text-ink-muted">
                <input type="checkbox" name={`occasion_${o.id}`} defaultChecked={product.occasionIds.includes(o.id)} />
                {o.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-1.5 text-sm text-ink-muted">
            <input type="checkbox" name="customizable" defaultChecked={product.customizable} />
            Customizable
          </label>
          <label className="flex items-center gap-1.5 text-sm text-ink-muted">
            <input type="checkbox" name="featured" defaultChecked={product.featured} />
            Featured (shows a &ldquo;Popular&rdquo; badge)
          </label>
          <label className="flex items-center gap-1.5 text-sm text-ink-muted">
            <input type="checkbox" name="active" defaultChecked={product.active} />
            Active (visible on the site)
          </label>
        </div>

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
    </div>
  );
}
