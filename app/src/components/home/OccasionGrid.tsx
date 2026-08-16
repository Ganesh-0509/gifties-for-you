import { Link } from "react-router-dom";
import { Flame, Heart, Home, Sparkles, Gift, ArrowRight, type LucideIcon } from "lucide-react";
import { OCCASIONS } from "../../data/products";
import { SectionHeading } from "../ui/SectionHeading";
import { ThreeDCard } from "../ui/ThreeDCard";
import { Reveal } from "../ui/Reveal";
import { asset } from "../../lib/asset";

const OCCASION_META: Record<string, { icon: LucideIcon; image: string }> = {
  wedding: {
    icon: Heart,
    image: "/products/silver-basket-favors-1.jpg",
  },
  birthday: {
    icon: Gift,
    image: "/products/panda-lunch-box.jpg",
  },
  housewarming: {
    icon: Home,
    image: "/products/floral-jar-peacock.jpg",
  },
  festival: {
    icon: Flame,
    image: "/products/brass-diya-flower-set.jpg",
  },
  corporate: {
    icon: Sparkles,
    image: "/products/pichwai-tin-tray-set.jpg",
  },
};

export function OccasionGrid() {
  return (
    <section className="container-page py-12 sm:py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Shop by occasion"
          title="What are you celebrating?"
          description="Start from the occasion and we'll narrow the catalogue down for you."
        />
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {OCCASIONS.map((occasion, idx) => {
          const meta = OCCASION_META[occasion.id] || {
            icon: Gift,
            image: "/products/trinket-box-set.jpg",
          };
          const IconComponent = meta.icon;

          return (
            <Reveal key={occasion.id} delay={idx * 60}>
              <ThreeDCard
                maxTilt={8}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card h-full"
              >
                <Link
                  to={`/shop?occasion=${occasion.id}`}
                  className="flex flex-col h-full aspect-[4/5] sm:aspect-square relative overflow-hidden"
                >
                  {/* High-Resolution Real Inventory Background Photo */}
                  <img
                    src={asset(meta.image)}
                    alt={occasion.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-black/20 transition-opacity duration-300 group-hover:from-ink/95" />

                  {/* Floating Icon Badge Top Left */}
                  <div className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary backdrop-blur-md shadow-sm transition-transform group-hover:scale-110">
                    <IconComponent className="h-4 w-4" strokeWidth={2} />
                  </div>

                  {/* Bottom Text & Link Affordance */}
                  <div className="relative z-10 mt-auto p-4 flex flex-col items-start gap-1">
                    <span className="font-display text-base font-bold text-white group-hover:text-primary-soft transition-colors leading-tight">
                      {occasion.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 group-hover:text-white transition-colors">
                      Browse Gifts <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </ThreeDCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
