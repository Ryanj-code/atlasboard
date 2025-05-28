import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Palette, User, Lock } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Settings
      </h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Appearance
        </h2>
        <div className="flex gap-4">
          {/* Light */}
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition ${
              theme === "light"
                ? "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
                : "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Sun className="w-4 h-4 text-yellow-500 dark:text-yellow-300" />
            Light
          </button>

          {/* Dark */}
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition ${
              theme === "dark"
                ? "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
                : "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-800 dark:text-indigo-400" />
            Dark
          </button>

          {/* System */}
          <button
            onClick={() => setTheme("system")}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition ${
              theme === "system"
                ? "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
                : "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            System
          </button>
        </div>
      </section>

      {/* Profile Settings (placeholder) */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Profile
        </h2>
        <div className="bg-white dark:bg-gray-900 p-4 rounded shadow border dark:border-gray-800">
          <div className="flex items-center gap-3">
            <User className="text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Profile editing coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Account Settings (placeholder) */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Account
        </h2>
        <div className="bg-white dark:bg-gray-900 p-4 rounded shadow border dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Lock className="text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Password and security settings coming soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
