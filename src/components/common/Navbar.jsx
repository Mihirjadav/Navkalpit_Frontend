import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="mb-6">
      <div className="rounded-[20px] bg-emerald-50/90 px-4 md:px-6 py-3 flex items-center">
        <div className="mr-4 md:mr-6 flex items-center">
          <img
            src="/logo.png"
            alt="Navkalpit Logo"
            className="w-10 h-10 md:w-20 md:h-20 object-contain"
          />
        </div>

        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden mr-3 p-2 rounded-md bg-transparent"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-slate-800"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <nav className="flex-1 hidden md:flex justify-center">
          <ul className="flex gap-8 text-sm text-slate-800 font-medium">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/service">Service</Link>
            </li>
            <li>
              <Link to="/technology">Technology</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/career">Career</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-slate-800"
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
            Log In
          </Link>

          <div className="relative">
            <button
              onClick={() => navigate("/cart")}
              className="w-8 h-8 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 text-sm"
            >
              🛒
            </button>

            <span className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>

        {/* MOBILE MENU (full screen overlay) */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
            <div className="absolute left-0 top-0 w-3/4 max-w-xs h-full bg-emerald-50/95 p-6 overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-12 h-12 object-contain"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M6 18L18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav>
                <ul className="flex flex-col gap-4 text-slate-800">
                  <li>
                    <Link to="/about" onClick={() => setOpen(false)}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/service" onClick={() => setOpen(false)}>
                      Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/technology" onClick={() => setOpen(false)}>
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link to="/news" onClick={() => setOpen(false)}>
                      News
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" onClick={() => setOpen(false)}>
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/career" onClick={() => setOpen(false)}>
                      Career
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Contact
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 border-t border-slate-200/20 pt-4">
                  <Link
                    to="/login"
                    className="block mb-4 text-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    Log In
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/cart");
                    }}
                    className="w-full py-2 bg-slate-900/10 rounded-md"
                  >
                    Go to Cart
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
