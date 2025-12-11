import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="mb-6">
      <div className="rounded-[20px] bg-emerald-50/90 px-3 sm:px-6 py-3 flex items-center justify-between sm:justify-start">
        {/* LOGO */}
        <div className="mr-2 sm:mr-6 flex-shrink:0">
          <img
            src="/logo.png"
            alt="Navkalpit Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-19 lg:h-19 object-contain"
          />
        </div>

        {/* HAMBURGER MENU BUTTON - Mobile Only */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden flex flex-col gap-1.5 ml-auto mr-3"
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-slate-800 transition-all ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-slate-800 transition-all ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-slate-800 transition-all ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        {/* CENTER NAV LINKS - Hidden on mobile */}
        <nav className="hidden sm:flex flex-1 justify-center">
          <ul className="flex gap-4 lg:gap-8 text-xs sm:text-sm lg:text-base text-slate-800 font-medium">
            <li>
              <Link to="/service" className="hover:text-slate-600 transition">
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/technology"
                className="hover:text-slate-600 transition"
              >
                Technology
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-slate-600 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-slate-600 transition">
                Customer Care
              </Link>
            </li>
          </ul>
        </nav>

        {/* RIGHT SECTION — Login + Cart - Desktop */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-4 ml-auto">
          {/* LOGIN USING LINK */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 hover:text-slate-600 transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-1"
            >
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                stroke="#0f172a"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1"
                stroke="#0f172a"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Log In</span>
          </Link>

          {/* CART BUTTON USING NAVIGATE */}
          <div className="relative">
            <button
              onClick={() => navigate("/cart")}
              className="w-8 h-8 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 text-sm hover:bg-slate-900/20 transition"
            >
              🛒
            </button>

            <span className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>

        {/* RIGHT SECTION - Mobile Only */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={() => navigate("/cart")}
            className="w-7 h-7 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 text-xs hover:bg-slate-900/20 transition relative"
          >
            🛒
            <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center text-[10px]">
              0
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 rounded-[20px] bg-emerald-50/95 px-3 py-3 animate-in fade-in slide-in-from-top-2">
          <nav className="space-y-2">
            <Link
              to="/service"
              className="block px-3 py-2 text-sm text-slate-800 hover:bg-emerald-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Service
            </Link>
            <Link
              to="/technology"
              className="block px-3 py-2 text-sm text-slate-800 hover:bg-emerald-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Technology
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 text-sm text-slate-800 hover:bg-emerald-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/support"
              className="block px-3 py-2 text-sm text-slate-800 hover:bg-emerald-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customer Care
            </Link>
            <hr className="my-2 border-emerald-200" />
            <Link
              to="/login"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-800 hover:bg-emerald-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                  stroke="#0f172a"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1"
                  stroke="#0f172a"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
