import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "../../config/business";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { FloatingPetals } from "./FloatingPetals";
import { ThreeDCard } from "../ui/ThreeDCard";
import type { CategoryId } from "../../data/products";

const ROTATING_OCCASIONS = [
  "WEDDINGS.",
  "HOUSEWARMING.",
  "POOJA COMBOS.",
  "RETURN GIFTS.",
  "BABY SHOWERS.",
];

const COLLAGE: { categoryId: CategoryId; label: string; className: string; image: string }[] = [
  {
    categoryId: "pooja-devotional",
    label: "Pooja & festive gifting",
    className: "translate-y-2",
    image: "/products/brass-diya-flower-set.jpg",
  },
  {
    categoryId: "return-gifts",
    label: "Return gift combos",
    className: "-translate-y-2",
    image: "/products/trinket-box-set.jpg",
  },
  {
    categoryId: "personalized",
    label: "Personalized keepsakes",
    className: "translate-y-4",
    image: "/products/floral-jar-peacock.jpg",
  },
  {
    categoryId: "hampers",
    label: "Gift hampers",
    className: "-translate-y-1",
    image: "/products/silver-basket-favors-1.jpg",
  },
];

export function Hero() {
  const navigate = useNavigate();
  const [occasionIndex, setOccasionIndex] = useState(0);

  const enquiryLink = buildWhatsAppLink(`Hi ${business.name}! I have a question about your custom return gifts.`);

  useEffect(() => {
    const timer = setInterval(() => {
      setOccasionIndex((prev) => (prev + 1) % ROTATING_OCCASIONS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border bg-canvas">
      <div className="hero-bg-photo absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-canvas from-0% via-canvas/65 via-42% to-transparent to-65%"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-canvas/10 via-transparent to-canvas/30"
        aria-hidden="true"
      />
      <FloatingPetals />

      <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="tag-punch inline-flex items-center gap-1.5 rounded-tag bg-secondary-soft py-1.5 pr-4 pl-6 text-xs font-semibold tracking-wide text-secondary uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Bespoke Return Gifts &amp; Celebration Hampers
            </span>
          </div>

          {/* 3D Perspective Rotating Headline */}
          <h1 className="mt-2 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl font-display font-semibold">
            <span className="block">Bespoke Gifts for</span>
            <span className="block h-[1.25em] relative overflow-hidden text-primary">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_OCCASIONS[occasionIndex]}
                  initial={{ rotateX: -90, opacity: 0, y: 16 }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  exit={{ rotateX: 90, opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: "50% 50% -15px" }}
                  className="absolute left-0 top-0 font-bold"
                >
                  {ROTATING_OCCASIONS[occasionIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg leading-relaxed">
            {business.shortDescription} Browse by occasion, custom tag preferences, or bulk count — then chat with us directly on WhatsApp with zero hassle.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-ink-on-primary transition-all duration-150 hover:bg-primary-dark shadow-md hover:shadow-lg"
            >
              Explore Full Catalogue
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <WhatsAppButton href={enquiryLink} size="lg" />
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/80 pt-4 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4 text-secondary" /> 100% Verified Quality
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Truck className="h-4 w-4 text-secondary" /> Pan-India Safe Delivery
            </span>
          </div>
        </div>

        {/* 3D Spatial Interactive Collage */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {COLLAGE.map((item) => (
              <ThreeDCard
                key={item.categoryId}
                maxTilt={8}
                className={`overflow-hidden border border-border shadow-card ${item.className}`}
              >
                <div
                  onClick={() => navigate(`/shop?category=${item.categoryId}`)}
                  className="cursor-pointer group relative"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <MediaPlaceholder categoryId={item.categoryId} label={item.label} className="aspect-square" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block text-xs font-semibold text-white group-hover:text-primary-soft transition-colors">
                      {item.label} &rarr;
                    </span>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
