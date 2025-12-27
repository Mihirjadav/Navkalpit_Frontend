import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12">
          {/* Contact Section */}
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-6 sm:mb-8">
              Contact
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  The Millenium Circle, 409, 150 Feet Ring Rd, nr. Nana Mava,
                  Padmi Society, Mavdi, Rajkot, Gujarat 360005
                </p>
              </div>
              <div>
                <a
                  href="mailto:info@navkalpit.com"
                  className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  info@navkalpit.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+917383881288"
                  className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  +91 73838 81288
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-6 sm:mb-8">
              Be in the Know
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We are providing a best service of 3D Printing of your design.
              High-quality 3D printing solutions with precision and reliability.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-6 sm:mb-8">
              Menu
            </h3>
            <nav className="space-y-3 sm:space-y-4">
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service"
                    className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Service
                  </Link>
                </li>

                <li>
                  <Link
                    to="/technology"
                    className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Technology
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop"
                    className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    Shop
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-6 sm:mb-8">
              Follow us on
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a
                  href="https://www.facebook.com/share/19tdFeRrnR/"
                  target="_blank"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs sm:text-sm"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs sm:text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/navkalpit2610?igsh=MTlveXRwdjRubWR0dQ=="
                  target="_blank"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs sm:text-sm"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@navkalpitofficial?si=2qpautCVcytz4wuS"
                  target="_blank"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs sm:text-sm"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-6 sm:pt-8 mt-6 sm:mt-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
          <p>© {currentYear} Navkalpit 3D Printing. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
