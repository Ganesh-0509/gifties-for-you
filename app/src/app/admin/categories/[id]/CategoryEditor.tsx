"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { CatCategory } from "@/lib/catalog-types";
import { fileToDataUrl } from "@/lib/image-file";
import { saveCategoryAction } from "./actions";

export function CategoryEditor({ category }: { category: CatCategory }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState<string | null>(category.image);
  const [newImage, setNewImage] = useState<string>("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
    setNewImage(dataUrl);
  }

  function submit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveCategoryAction(category.id, formData);
      if (res.error) setError(res.error);
      else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <form action={submit} className="space-y-4">
      <input type="hidden" name="currentImage" value={category.image ?? ""} />
      <input type="hidden" name="newImage" value={newImage} />

      <div>
        <p className="text-sm font-semibold text-ink">Photo</p>
        <label className="mt-2 flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-border text-xs text-ink-faint hover:border-primary">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            "+ Add photo"
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-ink">Name</span>
        <input name="name" defaultValue={category.name} required className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Description</span>
        <textarea name="description" defaultValue={category.description} rows={2} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </label>

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
