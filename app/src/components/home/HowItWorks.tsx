import { Search, MessageCircle, HandCoins, Gift } from "lucide-react";
import { ThreeDCard } from "../ui/ThreeDCard";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const STEPS = [
  {
    icon: Search,
    title: "Browse",
    description: "Find products by occasion, category or price range.",
  },
  {
    icon: MessageCircle,
    title: "Enquire",
    description: "Tap through to WhatsApp with your product and quantity pre-filled.",
  },
  {
    icon: HandCoins,
    title: "Confirm & Pay",
    description: "We confirm pricing, timelines and custom tags over chat.",
  },
  {
    icon: Gift,
    title: "Receive",
    description: "Safe Pan-India delivery or pickup coordinated with you.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-canvas-deep py-12 sm:py-16">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From browsing to your doorstep"
            description="Ordering return gifts and bespoke hampers is simple and personal."
          />
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const IconComponent = step.icon;

            return (
              <Reveal key={step.title} delay={i * 80}>
                <ThreeDCard
                  maxTilt={8}
                  className="h-full rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-raised transition-all duration-300 relative flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badge & Icon Header Row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-ink-on-primary shadow-sm">
                        0{i + 1}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                        <IconComponent className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ThreeDCard>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
