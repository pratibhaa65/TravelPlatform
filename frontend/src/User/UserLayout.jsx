import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./components/UserHeader";
import UserSidebar from "./components/UserSidebar";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <UserSidebar
        isOpen={sidebarOpen}
        collapsed={collapsed}
        setIsOpen={setSidebarOpen}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
          `}
      >
        <UserHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 md:p-10 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
