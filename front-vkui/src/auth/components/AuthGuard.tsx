import { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useLocation } from "@vkontakte/vk-mini-apps-router/dist/hooks/hooks";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: "employee" | "manager" | "hr";
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to home page if user doesn't have required role
    // return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
