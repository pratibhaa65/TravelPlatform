import React from "react";
import Analytics from "./Analytics";

const AdminOverview = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="bg-[url('/admindash.jpg')] bg-cover bg-center rounded-xl p-8 mb-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
        <p className="mt-2 text-sm">
          Monitor platform activity, manage users and bookings, and track business performance.
        </p>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Analytics Overview</h3>
        <Analytics />
      </div>

    </>
  );
};

export default AdminOverview;
