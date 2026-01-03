import React from "react";

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


      {/* Analytics Card */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Analytics Overview</h3>
        <div className="h-40 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
          Chart goes here
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
