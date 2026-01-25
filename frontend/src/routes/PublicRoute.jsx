import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.isAuthenticated) {
    return auth.role === "admin" ? (
      <Navigate to="/admindashboard" replace />
    ) : (
      <Navigate to="/userdashboard" replace />
    );
  }

  return children; 
};

export default PublicRoute;
