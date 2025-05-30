import { type RouteObject } from "react-router-dom";
import { Login } from "@/features/auth/Login";
import { Signup } from "@/features/auth/Signup";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { NotFound } from "@/features/app/NotFound";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Landing } from "@/features/landing/Landing";
import Settings from "@/features/settings/Settings";
import TaskDisplay from "@/features/task/TaskDisplay";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/settings", element: <Settings /> },
      { path: "/board/:boardId", element: <TaskDisplay /> },
      // Add more authenticated routes here
    ],
  },
  { path: "*", element: <NotFound /> },
];
