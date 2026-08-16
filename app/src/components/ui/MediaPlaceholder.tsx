import { Gift, Flame, Sparkles, PackageOpen, Home, type LucideIcon } from "lucide-react";
import type { CategoryId } from "../../data/products";

/**
 * Stand-in product imagery until real photography is supplied.
 *
 * Deliberately does NOT try to look like a real photo — an icon on a soft
 * tinted tile reads honestly as "placeholder," per the discovery brief's
 * rule against fabricating images that imply they're real product photos.
 *
 * When real photos exist, ProductCard/ProductGallery render them instead
 * of this component automatically (see their `images.length > 0` check) —
 * no redesign needed, just populate `images` in src/data/products.ts.
 */

const CATEGORY_STYLE: Record<CategoryId, { icon: LucideIcon; className: string }> = {
  "return-gifts": { icon: Gift, className: "bg-primary-soft text-primary" },
  "pooja-devotional": { icon: Flame, className: "bg-secondary-soft text-secondary" },
  personalized: { icon: Sparkles, className: "bg-primary-soft text-primary-dark" },
  hampers: { icon: PackageOpen, className: "bg-secondary-soft text-secondary" },
  "home-utility": { icon: Home, className: "bg-canvas-deep text-ink-muted" },
};

export function MediaPlaceholder({
  categoryId,
  label,
  className = "",
}: {
  categoryId: CategoryId;
  label: string;
  className?: string;
}) {
  const style = CATEGORY_STYLE[categoryId];
  const Icon = style.icon;

  return (
    <div
      role="img"
      aria-label={`Placeholder image — ${label} (demo product photo not yet available)`}
      className={`relative flex items-center justify-center overflow-hidden ${style.className} ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <Icon aria-hidden="true" className="relative h-9 w-9 opacity-70 sm:h-11 sm:w-11" strokeWidth={1.5} />
    </div>
  );
}
