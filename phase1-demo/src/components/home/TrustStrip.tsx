import { MessageCircleHeart, PackageCheck, Palette } from "lucide-react";

/**
 * Trust signals kept feature-based, not stat-based — we don't have real
 * review counts, years-in-business, or order volume to cite (see
 * frontend-design/13-assets-and-content.md), and this project must not
 * fabricate them. These are honest, verifiable-by-behavior claims about
 * how the site works instead.
 *
 * Deliberately NOT a plain 3-icon feature row — that's one of the most
 * common generic-SaaS/AI-template tells (flagged in the Generic AI Test,
 * see QA-AUDIT.md). Each point is styled as an actual gift tag — using the
 * same punch-hole + rotation language as the hero eyebrow and occasion
 * tiles — so this section reads as part of Gifties For You specifically,
 * not a swappable "why choose us" block that could belong to any product.
 */
const POINTS = [
  {
    icon: MessageCircleHeart,
    title: "Talk to a real person",
    description: "Every enquiry goes straight to WhatsApp — no queue, no bot, no cart to fight with.",
    tint: "bg-primary-soft",
    rotate: "-rotate-1",
  },
  {
    icon: PackageCheck,
    title: "Built for bulk",
    description: "Return-gift quantities and event orders are the normal case here, not an edge case.",
    tint: "bg-secondary-soft",
    rotate: "rotate-1",
  },
  {
    icon: Palette,
    title: "Customization on request",
    description: "Many pieces can be personalized — ask when you enquire and we'll confirm what's possible.",
    tint: "bg-canvas-deep",
    rotate: "-rotate-1",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-6 py-12 sm:grid-cols-3 sm:py-14">
        {POINTS.map((point) => (
          <div
            key={point.title}
            className={`tag-punch rounded-lg ${point.tint} p-5 pl-8 shadow-card transition-transform duration-150 hover:rotate-0 ${point.rotate}`}
          >
            <point.icon aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <p className="mt-2.5 font-display text-base text-ink">{point.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
