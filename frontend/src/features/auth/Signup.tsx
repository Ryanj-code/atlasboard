import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signup(email, username, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-slate-900">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-md bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-[#5c3a0d] dark:text-amber-100 mb-6 text-center">
          Sign Up
        </h1>

        <p className="text-center text-m text-amber-700 dark:text-amber-300 mb-6">
          Join AtlasBoard by creating an account!
        </p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-amber-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#5c3a0d] dark:text-amber-100 placeholder-zinc-500 dark:placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-amber-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#5c3a0d] dark:text-amber-100 placeholder-zinc-500 dark:placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-amber-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#5c3a0d] dark:text-amber-100 placeholder-zinc-500 dark:placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
            required
          />
          <Button type="submit" variant="primary" size="md" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#5c3a0d] dark:text-amber-200 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Home Icon */}
      <Link
        to="/"
        className="mt-6 text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors flex items-center gap-1 text-sm"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
};
