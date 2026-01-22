import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../User/components/ProtectedRoutes";
import UserDashboard from "../User/UserDashboard";
import UserOverview from "../User/pages/UserOverview";
import MyBooking from "../User/pages/MyBooking";
import AddBooking from "../User/pages/AddBooking";
import UserPackages from "../User/pages/UserPackages";

const UserRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route element={<UserDashboard />}>
          <Route index element={<UserOverview />} />
          <Route path="bookings/mybookings" element={<MyBooking />} />
          <Route path="bookings/addbooking" element={<AddBooking />} />
          <Route path="packages" element={<UserPackages />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default UserRoutes;
