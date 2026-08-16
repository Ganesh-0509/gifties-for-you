import { MessageCircle } from "lucide-react";

type Size = "md" | "lg";

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3.5 text-base gap-2.5",
};

/**
 * The single highest-priority action in the product (see frontend-design/
 * 09-component-requirements.md). WhatsApp's own green is used deliberately
 * here — and ONLY here — as a functional affordance color so this button
 * is instantly recognizable as "opens WhatsApp," distinct from the site's
 * terracotta/brass brand accents used everywhere else.
 */
export function WhatsAppButton({
  href,
  size = "md",
  label = "Enquire on WhatsApp",
  className = "",
}: {
  href: string;
  size?: Size;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-md bg-whatsapp font-semibold text-white transition-colors duration-150 hover:bg-whatsapp-dark ${SIZE_CLASSES[size]} ${className}`}
    >
      <MessageCircle aria-hidden="true" className="h-[1.1em] w-[1.1em]" strokeWidth={2} />
      {label}
    </a>
  );
}
