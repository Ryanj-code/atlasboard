import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    // Add more links as needed
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-950 border-b shadow-sm dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-indigo-300"
        >
          AtlasBoard
        </Link>

        {/* Nav Links */}
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-blue-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-indigo-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/settings")}
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-indigo-300"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
