import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-50 text-gray-700">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
