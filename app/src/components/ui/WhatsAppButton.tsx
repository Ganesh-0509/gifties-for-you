import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  href,
  size = "md",
  label = "Enquire on WhatsApp",
}: {
  href: string;
  size?: "md" | "lg";
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-2 rounded-md bg-whatsapp font-semibold text-white transition-colors hover:bg-whatsapp-dark ${
        size === "lg" ? "px-6 py-3.5 text-base" : "px-4 py-2.5 text-sm"
      }`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
