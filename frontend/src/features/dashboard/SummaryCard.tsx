type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  description: string;
};

export const SummaryCard = ({ icon, title, value, description }: SummaryCardProps) => (
  <div className="group relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/50 dark:border-slate-600/40 hover:scale-[1.02] overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 dark:from-slate-700/20 dark:to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    {/* Glowing top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 dark:from-amber-500 dark:via-orange-500 dark:to-yellow-500 rounded-t-2xl" />

    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-500 dark:to-orange-800 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-50 transition-colors duration-300">
          {title}
        </h3>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
        {description}
      </p>

      <div className="mt-2 text-3xl font-bold text-amber-800 dark:text-amber-100 group-hover:text-amber-900 dark:group-hover:text-amber-50 transition-colors duration-300">
        {value}
      </div>
    </div>
  </div>
);
