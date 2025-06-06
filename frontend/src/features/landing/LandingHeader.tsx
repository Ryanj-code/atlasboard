import { Link } from "react-router-dom";

export const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#fdfcf9]/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 transition-colors"
        >
          AtlasBoard
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-300 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-300 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};
