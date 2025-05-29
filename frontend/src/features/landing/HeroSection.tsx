import Button from "@/components/ui/Button";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => (
  <main className="px-6 py-16 text-center max-w-4xl mx-auto">
    <div className="mb-8 flex justify-center">
      <Globe className="w-16 h-16 text-amber-600 dark:text-amber-300 animate-pulse" />
    </div>
    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
      Navigate Your Work, Globally.
    </h2>
    <p className="text-lg sm:text-xl mb-8 text-zinc-700 dark:text-amber-300">
      AtlasBoard helps developers organize projects, tasks, and progress with
      clarity and collaboration. Inspired by the world, designed for builders.
    </p>
    <Link
      to="/signup"
      className="inline-block px-8 py-3 rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 transition shadow-lg"
    >
      Get Started
    </Link>
  </main>
);
