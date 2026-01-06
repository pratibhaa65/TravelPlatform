import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle className="text-2xl text-gray-600 hover:text-red-800" />
        <span className="text-gray-700 font-medium">{user.name}</span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="flex flex-col items-center p-4">
            <FaUserCircle className="text-4xl text-gray-600 mb-2" />
            <p className="text-gray-800 font-semibold">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <hr />
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
