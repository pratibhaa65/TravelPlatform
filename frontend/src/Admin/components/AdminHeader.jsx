import React from "react";
import { FaUserCircle, FaBell, FaBars } from "react-icons/fa";

const AdminHeader = ({ setSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Admin" };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm w-full">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-red-800 transition" />
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-2xl text-gray-600 hover:text-red-800" />
          <span className="text-gray-700 font-medium">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
