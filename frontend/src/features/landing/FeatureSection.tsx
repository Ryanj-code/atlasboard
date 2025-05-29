import { LayoutDashboard, ShieldCheck, Sparkles } from "lucide-react";

export const FeaturesSection = () => (
  <section className="py-20 border-b border-t">
    <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-amber-50 dark:bg-slate-700 rounded-xl p-6 shadow">
        <LayoutDashboard className="w-8 h-8 mb-4 text-amber-600 dark:text-amber-300" />
        <h3 className="text-xl font-semibold mb-2">Project Boards</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Organize your development efforts into distinct boards with tasks.
        </p>
      </div>
      <div className="bg-amber-50 dark:bg-slate-700 rounded-xl p-6 shadow">
        <ShieldCheck className="w-8 h-8 mb-4 text-amber-600 dark:text-amber-300" />
        <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          JWT authentication and secure APIs keep your data protected.
        </p>
      </div>
      <div className="bg-amber-50 dark:bg-slate-700 rounded-xl p-6 shadow">
        <Sparkles className="w-8 h-8 mb-4 text-amber-600 dark:text-amber-300" />
        <h3 className="text-xl font-semibold mb-2">Globally Inspired</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          AtlasBoard blends aesthetics from global navigation tools with modern
          developer needs.
        </p>
      </div>
    </div>
  </section>
);
