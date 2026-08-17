"use client";

import { useState, useTransition } from "react";
import { changePasswordAction } from "./actions";

export function PasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function submit(formData: FormData) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await changePasswordAction(formData);
      if (res.error) setError(res.error);
      else setSuccess(true);
    });
  }

  return (
    <form action={submit} className="max-w-sm space-y-3">
      <label className="block text-sm">
        <span className="font-medium text-ink">Current password</span>
        <input name="currentPassword" type="password" required className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">New password (min 8 characters)</span>
        <input name="newPassword" type="password" required minLength={8} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Confirm new password</span>
        <input name="confirmPassword" type="password" required minLength={8} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" />
      </label>

      {error && <p className="rounded-md bg-error-soft px-3 py-2 text-sm text-error">{error}</p>}
      {success && <p className="rounded-md bg-success-soft px-3 py-2 text-sm text-success">Password changed.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-border-strong px-5 py-2 text-sm font-semibold text-ink hover:bg-canvas-deep/40 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Change password"}
      </button>
    </form>
  );
}
