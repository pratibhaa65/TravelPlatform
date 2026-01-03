import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminOverview from "./pages/AdminOverview";
import AdminLayout from "./AdminLayout";
import AdminPackageList from "./pages/AdminPackageList";


const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminOverview />} />
        {/* <Route path="users" element={<Users />} /> */}
        <Route path="packages" element={<AdminPackageList />} />
        {/* <Route path="bookings" element={<Bookings />} /> */}
        {/* <Route path="payments" element={<Payments />} /> */}

        <Route path="*" element={<Navigate to="/admindashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
