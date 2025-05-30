import { Link } from "react-router-dom";

export const LandingHeader = () => {
  return (
    <header className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800 px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-amber-700 dark:text-amber-200 tracking-tight">
          AtlasBoard
        </h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-300 transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-300 transition font-medium"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};
