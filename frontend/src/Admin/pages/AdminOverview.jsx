import React from "react";
import Analytics from "./Analytics";

const AdminOverview = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="relative rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('/dash.png')] opacity-90 bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="relative p-16 md:p-20 text-white rounded-3xl bg-gradient-to-rshadow-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome back,{" "}
            {user?.name || "Admin"}
            👋
          </h2>

          <p className="mt-5 text-base md:text-lg max-w-3xl text-blue-100 leading-relaxed">
            Monitor platform activity, manage users and bookings, analyze trends, and
            keep your business running smoothly—all from one powerful dashboard.
          </p>

          <div className="absolute top-6 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"></div>
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-gray-50 p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Analytics Overview</h3>
        <Analytics />
      </div>

    </>
  );
};

export default AdminOverview;
