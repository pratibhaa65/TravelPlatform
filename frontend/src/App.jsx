import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage"; 
import Contact from "./pages/contact";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Packages from "./pages/Packages";
import AddPackage from "./pages/AddPackage";
import AddBooking from "./pages/AddBooking";
import MyBooking from "./pages/MyBooking";
import PackageList from "./pages/PackageList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packagelist" element={<PackageList />} />
        <Route path="/addPackage" element={<AddPackage />} />
        <Route path="/addBooking" element={<AddBooking />} />
        <Route path="/mybookings" element={<MyBooking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
