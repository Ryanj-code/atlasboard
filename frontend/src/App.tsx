import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { loading } = useAuth();
  const element = useRoutes(routes);

  if (loading) {
    return (
      <div className="text-center mt-10 text-zinc-600 dark:text-zinc-300">
        Loading...
      </div>
    );
  }
  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
}

export default App;
