import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Settings", path: "/settings" },
    // Add more links as needed
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
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
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Actions (Placeholder) */}
        <div className="flex items-center space-x-3">
          <button className="text-sm text-gray-700 hover:text-blue-500">
            Profile
          </button>
          <button className="text-sm text-gray-700 hover:text-blue-500">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
