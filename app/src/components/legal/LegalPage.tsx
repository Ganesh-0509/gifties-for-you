import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl text-ink sm:text-4xl">{title}</h1>
        <p className="mt-1 text-xs text-ink-faint">
          Last updated {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <div className="prose prose-sm mt-6 max-w-none space-y-4 text-ink-muted [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
