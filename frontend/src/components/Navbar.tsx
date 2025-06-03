import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Settings, LogOut, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-[#fdfcf9] dark:bg-slate-900 border-b border-amber-200 dark:border-slate-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-amber-700 dark:text-amber-300"
        >
          AtlasBoard
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-blue-600 dark:text-sky-300"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-sky-400"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-sky-400 transition"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-slate-800 rounded-lg transition"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 border-t border-amber-200 dark:border-slate-700 bg-[#fdfcf9] dark:bg-slate-900">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-2 py-2 rounded text-sm font-medium ${
                location.pathname === item.path
                  ? "text-blue-600 dark:text-sky-300 bg-blue-50 dark:bg-sky-900/20"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              navigate("/settings");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full px-2 py-2 rounded text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-slate-800 transition"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2 py-2 rounded text-sm text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 mt-3 border-t pt-3 border-amber-200 dark:border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {user?.username || "User"}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
