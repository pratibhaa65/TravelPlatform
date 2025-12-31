import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <Link to="/" className="text-2xl font-bold text-blue-900">
        DESHTRIP
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-900">Home</Link>
          <Link to="/packages" className="hover:text-blue-900">Discover</Link>
          <Link to="/about" className="hover:text-blue-900">About Us</Link>
          <Link to="/contact" className="hover:text-blue-900">Contact</Link>
        </div>

        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 border rounded-md">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
