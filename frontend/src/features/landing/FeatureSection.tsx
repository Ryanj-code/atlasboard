import {
  LayoutDashboard,
  UserCheck,
  BellRing,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Real-Time Collaboration",
    icon: LayoutDashboard,
    description:
      "Work with your team seamlessly. Updates to boards, tasks, and assignments happen live — no refresh needed.",
  },
  {
    title: "Task Assignment",
    icon: UserCheck,
    description: "Assign tasks, clarify responsibilities, and track progress with ease.",
  },
  {
    title: "Access Control",
    icon: ShieldCheck,
    description: "Role-based permissions ensure only the right users can make changes.",
  },
  {
    title: "Instant Notifications",
    icon: BellRing,
    description: "Stay informed with real-time alerts for updates that matter.",
  },
  {
    title: "Simple, Clean Interface",
    icon: Sparkles,
    description:
      "Minimal, modern UI that helps teams focus on what matters most — their work.",
  },
];

export const FeaturesSection = () => (
  <section className="py-24 border-b border-t border-amber-200 dark:border-slate-700 bg-gradient-to-br from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
    <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-zinc-100 dark:border-slate-600"
          >
            <Icon className="w-8 h-8 mb-4 text-amber-600 dark:text-amber-300" />
            <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);
