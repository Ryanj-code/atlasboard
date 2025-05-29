import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuthGuard } from "@/hooks/useAuthGuard";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useAuthGuard();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <main className="flex-grow">{children || <Outlet />}</main>
    </div>
  );
};
