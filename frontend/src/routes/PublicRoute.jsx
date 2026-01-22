import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.isAuthenticated) {
    return auth.role === "admin"
      ? <Navigate to="/admindashboard" />
      : <Navigate to="/userdashboard" />;
  }

  return children;
};

export default PublicRoute;
