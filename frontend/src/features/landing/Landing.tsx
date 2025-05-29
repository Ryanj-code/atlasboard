import { LandingHeader } from "./LandingHeader";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeatureSection";
import { Footer } from "./Footer";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-950 dark:to-slate-900 text-zinc-800 dark:text-amber-200">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};
