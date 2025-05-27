import Button from "@/components/ui/Button";

export const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {/* Placeholder login form */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        <Button type="submit" variant="primary" size="md" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};
