import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">{children || <Outlet />}</main>
    </div>
  );
};
