import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const AdminProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.loading) return null;
  
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
  if (auth.role !== "admin") return <Navigate to="/userdashboard" replace />;

  return children;
};

export default AdminProtectedRoute;
