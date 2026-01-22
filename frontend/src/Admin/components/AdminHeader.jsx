import React from "react";
import { FaBell, FaBars } from "react-icons/fa";
import { logout } from "../../utils/auth"; 
import UserDropdown from "../../UserDropdown";

const AdminHeader = ({ setSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Admin", email: "admin@example.com" };

  return (
    <header className="flex items-center justify-between bg-gray-100 px-6 py-4 shadow-sm w-full">
      
      <div className="flex items-center gap-4">
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

      <div className="flex items-center gap-6">
        <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-red-800 transition" />

        <UserDropdown user={user} onLogout={logout} />
      </div>
    </header>
  );
};

export default AdminHeader;
