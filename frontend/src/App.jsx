// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
import AdminOverview from "./Admin/pages/AdminOverview";
import AdminPackageList from "./Admin/pages/AdminPackageList";
import LandingPage from "./LandingPages/pages/LandingPage";
import Home from "./LandingPages/pages/Home";
import Contact from "./LandingPages/pages/Contact";
import PackageList from "./LandingPages/pages/PackageList";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AddPackage from "./Admin/pages/AddPackage";
import EditPackage from "./Admin/pages/EditPackage";
import AdminBookingList from "./Admin/pages/AdminBookingList";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/packages" element={<PackageList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admindashboard" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />

          <Route path="packages" element={<AdminPackageList />} />
          <Route path="packages/addpackage" element={<AddPackage />} />
          <Route path="/admindashboard/packages/edit/:id" element={<EditPackage />} />

          <Route path="bookings" element={<AdminBookingList />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
