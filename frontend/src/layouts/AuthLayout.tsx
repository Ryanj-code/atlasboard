import { useGuestGuard } from "@/hooks/useGuestGuard";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const user = useGuestGuard();

  if (!user) return null;

  return <div className="min-h-screen">{children || <Outlet />}</div>;
};
