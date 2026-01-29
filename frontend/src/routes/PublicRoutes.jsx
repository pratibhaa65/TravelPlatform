// routes/PublicRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import LandingPage from "../LandingPages/pages/LandingPage";
import Home from "../LandingPages/pages/Home";
import Packages from "../LandingPages/pages/Packages";
import Contact from "../LandingPages/pages/contact";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
         
            <LandingPage />
         
        }
      />
      <Route
        path="/home"
        element={
          <PublicRoute><Home /></PublicRoute>
        }
      />
      <Route
        path="/packages"
        element={
          <PublicRoute><Packages /></PublicRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicRoute><Contact /></PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute><LoginPage /></PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute><RegisterPage /></PublicRoute>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;
