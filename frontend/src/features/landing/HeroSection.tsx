import Button from "@/components/ui/Button";
import { Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => (
  <main className="px-6 py-20 sm:py-24 text-center max-w-4xl mx-auto">
    <div className="mb-12 flex justify-center relative">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl scale-150 animate-pulse"></div>
        <Globe className="relative w-16 sm:w-20 h-16 sm:h-20 text-amber-400" />
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-bounce" />
      </div>
    </div>

    <div className="mb-10">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
        <span className="block bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent animate-pulse">
          Navigate Your Work,
        </span>
        <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          Globally.
        </span>
      </h1>

      <p className="text-lg sm:text-xl lg:text-2xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
        AtlasBoard helps organize projects, tasks, and progress with
        <span className="text-amber-300 font-semibold"> clarity and collaboration</span>.
        <br />
        <span className="text-base sm:text-lg text-slate-400">
          Structure your vision, execute with precision.
        </span>
      </p>
    </div>

    <Link to="/signup">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Link>
  </main>
);
