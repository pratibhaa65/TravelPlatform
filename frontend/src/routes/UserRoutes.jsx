import { Routes, Route } from "react-router-dom";
import UserProtectedRoute from "./UserProtectedRoute";
import UserDashboard from "../User/UserDashboard";
import UserOverview from "../User/pages/UserOverview";
import MyBooking from "../User/pages/MyBooking";
import AddBooking from "../User/pages/AddBooking";
import UserPackages from "../User/pages/UserPackages";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <UserProtectedRoute>
            <UserDashboard />
          </UserProtectedRoute>
        }
      >
        <Route index element={<UserOverview />} />

        <Route path="bookings/mybookings"
          element={
            <MyBooking />
          }
        />
        <Route path="bookings/addbooking"
          element={
            <AddBooking />
          }
        />
        <Route path="packages"
          element={
            <UserPackages />
          }
        />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
