import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    <header className="bg-[#fdfcf9] dark:bg-slate-900 border-b border-amber-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-amber-700 dark:text-amber-300"
        >
          AtlasBoard
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6">
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

        {/* User Actions */}
        <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
};

export default Navbar;
