import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const MARQUEE_ITEMS = [
  "BESPOKE RETURN GIFTS",
  "POOJA & FESTIVE COMBOS",
  "CUSTOM NAME TAGS",
  "WEDDING FAVORS",
  "LUXURY GIFT HAMPERS",
  "HOUSEWARMING KEEPSAKES",
  "PAN-INDIA DISPATCH",
  "BULK ORDER DISCOUNTS",
];

export function MarqueeTicker() {
  // Multiply array 4x for continuous seamless loop
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-primary-dark border-y border-border/40 py-2.5 z-30 shadow-sm text-ink-on-primary">
      {/* Left Edge Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary-dark to-transparent z-10 pointer-events-none" />
      {/* Right Edge Fade Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-8 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 28,
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 flex-shrink-0">
            <span className="font-mono text-xs tracking-[0.2em] font-bold uppercase text-ink-on-primary/95 hover:text-white transition-colors cursor-default">
              {item}
            </span>
            <Sparkles className="h-3 w-3 text-primary-soft/80" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
