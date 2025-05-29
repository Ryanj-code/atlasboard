import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Palette, User, Lock } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
            Settings
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Customize your experience and preferences
          </p>
        </div>

        {/* Theme */}
        <section>
          <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
            Theme Mode
          </h2>
          <div className="flex gap-4">
            {/* Light */}
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2 px-4 py-2 rounded border-2 font-medium transition ${
                theme === "light"
                  ? "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700"
                  : "bg-white dark:bg-slate-700 text-zinc-800 dark:text-white border-zinc-300 dark:border-slate-600 hover:bg-zinc-100 dark:hover:bg-slate-600"
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>

            {/* Dark */}
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2 px-4 py-2 rounded border-2 font-medium transition ${
                theme === "dark"
                  ? "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700"
                  : "bg-white dark:bg-slate-700 text-zinc-800 dark:text-white border-zinc-300 dark:border-slate-600 hover:bg-zinc-100 dark:hover:bg-slate-600"
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>

            {/* System */}
            <button
              onClick={() => setTheme("system")}
              className={`flex items-center gap-2 px-4 py-2 rounded border-2 font-medium transition ${
                theme === "system"
                  ? "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700"
                  : "bg-white dark:bg-slate-700 text-zinc-800 dark:text-white border-zinc-300 dark:border-slate-600 hover:bg-zinc-100 dark:hover:bg-slate-600"
              }`}
            >
              <Palette className="w-4 h-4" />
              System
            </button>
          </div>
        </section>

        {/* Profile Placeholder */}
        <section>
          <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
            Profile
          </h2>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-amber-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Profile editing coming soon.
              </p>
            </div>
          </div>
        </section>

        {/* Account Placeholder */}
        <section>
          <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
            Account
          </h2>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-amber-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Password and security settings coming soon.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
