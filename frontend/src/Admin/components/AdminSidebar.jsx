import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkedAlt,
  FaSuitcase,
  FaUsers,
  FaCog,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

const SidebarItem = ({ icon, label, to, collapsed, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-300
        ${isActive ? "bg-white text-red-700" : "hover:bg-white/20"}
        relative group`
      }
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}

      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </NavLink>
  );
};
const AdminSidebar = ({ collapsed, setCollapsed, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl z-40
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="px-4 py-6 flex justify-between items-center">
          {!collapsed && <span className="text-2xl font-bold">DeshTrip</span>}
          <button
            className="text-white text-xl"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 flex flex-col gap-2 px-2">
          <SidebarItem
            icon={<FaHome />}
            label="Dashboard"
            to="/admindashboard"
            collapsed={collapsed}
            end={true}
          />

          <SidebarItem
            icon={<FaMapMarkedAlt />}
            label="Packages"
            to="/admindashboard/packages"
            collapsed={collapsed}
          />

          <SidebarItem
            icon={<FaSuitcase />}
            label="Bookings"
            to="/admindashboard/bookings"
            collapsed={collapsed}
          />

          <SidebarItem
            icon={<FaUsers />}
            label="Users"
            to="/admindashboard/users"
            collapsed={collapsed}
          />
        </nav>

        {/* Settings button */}
                <div className="absolute bottom-6 w-full px-2">
                  <button
                    onClick={() => navigate(" ")}
                    className="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-2 hover:bg-white/30 transition-colors w-full justify-center"
                  >
                    <FaCog />
                    {!collapsed && <span>Settings</span>}
                  </button>
                </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
