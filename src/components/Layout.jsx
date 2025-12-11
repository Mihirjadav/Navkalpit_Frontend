// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-900 via-slate-900 to-black">
      {/* Navbar wrapper */}
      <div className="flex justify-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 w-full">
        <div className="w-full max-w-[1920px]">
          <Navbar />
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
