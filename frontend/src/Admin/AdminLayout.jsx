import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        isOpen={sidebarOpen}
        collapsed={collapsed}
        setIsOpen={setSidebarOpen}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
          ml-0`} 
      >
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 md:p-10 bg-gray-50">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
