import React from "react";
import Sidebar from "./admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-6 text-slate-100">{children}</main>
    </div>
  );
}
