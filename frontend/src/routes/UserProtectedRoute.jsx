import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const UserProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.loading) return null; 

  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
  if (auth.role !== "user") return <Navigate to="/admindashboard" replace />;

  return children;
};


export default UserProtectedRoute;
