import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  const element = useRoutes(routes);
  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
}

export default App;
