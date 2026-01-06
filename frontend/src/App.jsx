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
import AdminUsersList from "./Admin/pages/AdminUserList";
import UserDashboard from "./User/UserDashboard";
import ProtectedRoute from "./User/components/ProtectedRoutes";
import UserOverview from "./User/pages/UserOverview";
import MyBooking from "./User/pages/MyBooking";
import AddBooking from "./User/pages/AddBooking";
import UserPackages from "./User/pages/UserPackages";

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

        <Route
          path="/admindashboard"
          element={<AdminLayout />}
        >
          <Route index element={<AdminOverview />} />
          <Route path="packages" element={<AdminPackageList />} />
          <Route path="packages/addpackage" element={<AddPackage />} />
          <Route path="/admindashboard/packages/edit/:id" element={<EditPackage />} />
          <Route path="bookings" element={<AdminBookingList />} />
          <Route path="users" element={<AdminUsersList />} />
        </Route>


        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserOverview />} />
          <Route path="bookings/mybookings" element={<MyBooking />} />
          <Route path="bookings/addbooking" element={<AddBooking />} />
          <Route path="packages" element={<UserPackages />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
