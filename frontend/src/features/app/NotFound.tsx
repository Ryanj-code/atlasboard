import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-white dark:bg-slate-800 px-4">
      <h1 className="text-6xl font-bold text-[#5c3a0d] dark:text-amber-100 mb-3">404</h1>
      <p className="text-md text-zinc-600 dark:text-zinc-400 mb-6">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 hover:brightness-110 text-white shadow-md transition font-semibold text-sm"
      >
        Go Home
      </Link>
    </div>
  );
};
