import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();


  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="flex items-center justify-between  py-4">
      <Link to="/" className="text-2xl font-bold text-blue-900">
        DESHTRIP
      </Link>

      <div className="flex items-center ml-auto gap-10">
        <div className="flex items-center gap-6">
          <button onClick={() => scrollToSection("home")} className="hover:text-blue-900">
            Home
          </button>
          <button onClick={() => scrollToSection("package")} className="hover:text-blue-900">
            Discover
          </button>
          <button onClick={() => scrollToSection("about")} className="hover:text-blue-900">
            About Us
          </button>
          <Link
            id="contact"
            to="/contact"
            className="hover:text-blue-900"
          >
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

    </nav>
  );
};

export default Navbar;
