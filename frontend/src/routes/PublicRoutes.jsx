import { Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPages/pages/LandingPage";
import Home from "../LandingPages/pages/Home";
import Packages from "../LandingPages/pages/Packages";
import Contact from "../LandingPages/pages/contact";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default PublicRoutes;
