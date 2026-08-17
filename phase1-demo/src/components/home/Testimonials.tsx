import { TESTIMONIALS } from "../../data/testimonials";
import { SectionHeading } from "../ui/SectionHeading";
import { ThreeDCard } from "../ui/ThreeDCard";
import { Reveal } from "../ui/Reveal";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="container-page py-12 sm:py-16">
      <Reveal>
        <SectionHeading eyebrow="What customers say" title="From people who've ordered with us" />
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, idx) => (
          <Reveal key={t.name + t.quote.slice(0, 10)} delay={idx * 80}>
            <ThreeDCard maxTilt={8} className="h-full border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-7 w-7 text-primary/40" />
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="font-display text-base text-ink leading-relaxed italic">"{t.quote}"</p>

              <footer className="mt-4 pt-3 border-t border-border/60 text-sm font-semibold text-ink">
                — {t.name}
                {t.context && <span className="block text-xs font-normal text-ink-faint">{t.context}</span>}
              </footer>
            </ThreeDCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
