import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="px-6 py-20 text-center bg-gray-50">
      <h2 className="text-4xl font-bold mb-4">
        Organize your workflow with AtlasBoard
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Create boards. Track tasks. Collaborate easily.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </Link>
    </section>
  );
};
