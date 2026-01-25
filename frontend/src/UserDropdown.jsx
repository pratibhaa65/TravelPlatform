import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { logout } from "./utils/auth"; // make sure this exists

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState({ name: "User", email: "" });

  useEffect(() => {
    // Get logged-in user from localStorage
    const userJSON = localStorage.getItem("user");
    if (userJSON && userJSON !== "undefined") {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle className="text-2xl text-gray-600 hover:text-red-800" />
        <span className="text-gray-700 font-medium">{user.name}</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="flex flex-col items-center p-4">
            <FaUserCircle className="text-4xl text-gray-600 mb-2" />
            <p className="text-gray-800 font-semibold">{user.name}</p>
            {user.email && <p className="text-gray-500 text-sm">{user.email}</p>}
          </div>
          <hr />
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-800 hover:bg-red-50 rounded-b-xl font-medium"
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
