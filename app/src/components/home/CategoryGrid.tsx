import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../../data/products";
import { SectionHeading } from "../ui/SectionHeading";
import { ThreeDCard } from "../ui/ThreeDCard";
import { Reveal } from "../ui/Reveal";

const CATEGORY_PHOTOS: Record<string, string> = {
  "return-gifts": "/products/trinket-box-set.jpg",
  "pooja-devotional": "/products/pichwai-kumkum-tins.jpg",
  personalized: "/products/wooden-photo-frame.jpg",
  hampers: "/products/woven-silk-box-red.jpg",
  "home-utility": "/products/floral-jar-set-1.jpg",
};

export function CategoryGrid() {
  return (
    <section className="bg-canvas-deep py-12 sm:py-16">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Shop by category"
            title="Browse the full range"
            description="From small return-gift favors to curated hampers for bigger events."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {CATEGORIES.map((category, idx) => {
            const photo = CATEGORY_PHOTOS[category.id] || "/products/trinket-box-set.jpg";

            return (
              <Reveal key={category.id} delay={idx * 80}>
                <ThreeDCard maxTilt={8} className="h-full border border-border bg-surface rounded-2xl overflow-hidden shadow-card">
                  <Link
                    to={`/shop?category=${category.id}`}
                    className="group flex items-center gap-4 p-4 transition-colors"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-canvas-deep/40 relative">
                      <img
                        src={photo}
                        alt={category.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-semibold text-ink group-hover:text-primary transition-colors">
                        {category.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted leading-relaxed">
                        {category.description}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary transition-all duration-300">
                        Explore Range <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </ThreeDCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
