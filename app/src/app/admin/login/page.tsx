"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form action={formAction} className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-card">
        <h1 className="font-display text-xl font-semibold text-ink">Admin login</h1>
        <p className="mt-1 text-sm text-ink-muted">Gifties For You — owner area</p>

        <label className="mt-5 block text-sm">
          <span className="font-medium text-ink">Password</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>

        {state?.error && <p className="mt-3 rounded-md bg-error-soft px-3 py-2 text-sm text-error">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark disabled:opacity-60"
        >
          {pending ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
