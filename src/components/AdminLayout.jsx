import React, { useState } from "react";
import Sidebar from "./admin/Sidebar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile topbar with menu button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-slate-800 text-white"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile overlay sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="w-64 h-full bg-slate-900">
            <Sidebar isMobile onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 p-6 text-slate-100">{children}</main>
    </div>
  );
}
