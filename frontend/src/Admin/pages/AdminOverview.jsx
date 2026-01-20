import React from "react";
import Analytics from "./Analytics";

const AdminOverview = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="relative rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('/userdash.jpg')] bg-cover bg-center"></div>

\        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>

        {/* Content */}
        <div className="relative p-12 text-white">
          <h2 className="text-3xl font-extrabold tracking-wide">
            Welcome back, Admin👋
          </h2>
          <p className="mt-3 text-sm max-w-xl text-gray-200">
            Monitor platform activity, manage users and bookings, and track business performance.
          </p>
        </div>
      </div>
      
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Analytics Overview</h3>
        <Analytics />
      </div>

    </>
  );
};

export default AdminOverview;
