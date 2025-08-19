import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/welcome",
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (!isLoading && isAuthenticated) {
    const from = location.state?.from?.pathname || redirectTo;

    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
