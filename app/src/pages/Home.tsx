import { Hero } from "../components/home/Hero";
import { MarqueeTicker } from "../components/ui/MarqueeTicker";
import { TrustStrip } from "../components/home/TrustStrip";
import { OccasionGrid } from "../components/home/OccasionGrid";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { HowItWorks } from "../components/home/HowItWorks";
import { Testimonials } from "../components/home/Testimonials";
import { WhatsAppBanner } from "../components/home/WhatsAppBanner";
import { Reveal } from "../components/ui/Reveal";

export default function Home() {
  return (
    <>
      {/* Hero is above the fold */}
      <Hero />

      {/* Continuous 60fps Marquee Ticker placed directly below Hero section */}
      <MarqueeTicker />

      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <OccasionGrid />
      </Reveal>
      <Reveal>
        <CategoryGrid />
      </Reveal>
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <WhatsAppBanner />
      </Reveal>
    </>
  );
}
