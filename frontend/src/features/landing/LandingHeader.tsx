import { Link } from "react-router-dom";

export const LandingHeader = () => {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">AtlasBoard</h1>
      <nav className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
        <Link to="/signup" className="text-gray-700 hover:text-blue-600">
          Sign Up
        </Link>
      </nav>
    </header>
  );
};
