import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [targetSection, setTargetSection] = useState(null);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      setTargetSection(id);
      navigate("/");
    } else {
      scrollNow(id);
    }
  };

  const scrollNow = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && targetSection) {
      scrollNow(targetSection);
      setTargetSection(null);
    }
  }, [location, targetSection]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-blue-900">
          DESHTRIP
        </Link>

        <div className="hidden md:flex items-center gap-10 h-full">
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-900">
              Home
            </button>
            <button onClick={() => scrollToSection("packages")} className="hover:text-blue-900">
              Discover
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-blue-900">
              About Us
            </button>
            <Link to="/contact" className="hover:text-blue-900">
              Contact Us
            </Link>
          </div>

          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 border rounded-md">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

    </header>

  );
};

export default Header;
