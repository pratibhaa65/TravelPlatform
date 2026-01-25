import { Routes, Route } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "../Admin/AdminLayout";
import AdminOverview from "../Admin/pages/AdminOverview";
import AdminPackageList from "../Admin/pages/AdminPackageList";
import AddPackage from "../Admin/pages/AddPackage";
import EditPackage from "../Admin/pages/EditPackage";
import AdminBookingList from "../Admin/pages/AdminBookingList";
import AdminUsersList from "../Admin/pages/AdminUserList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />

        <Route path="packages"
          element={
            <AdminPackageList />
          }
        />
        <Route path="packages/addpackage"
          element={
            <AddPackage />
          }
        />
        <Route path="packages/edit/:id"
          element={
            <EditPackage />
          }
        />
        <Route path="bookings"
          element={
            <AdminBookingList />
          }
        />
        <Route path="users"
          element={
            <AdminUsersList />
          }
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

