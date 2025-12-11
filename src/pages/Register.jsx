// src/pages/Register.jsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StudentForm from "../components/register/StudentForm";
import StartupForm from "../components/register/StartupForm";
import CommercialForm from "../components/register/CommercialForm";

export default function Register() {
  const [category, setCategory] = useState("student");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 sm:py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
            Register
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">
            Select your category and fill the form.
          </p>

          {/* Category Selection */}
          <div
            className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
            aria-label="Category"
          >
            <button
              type="button"
              onClick={() => setCategory("student")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
                category === "student"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700/70 text-slate-200 hover:bg-slate-700"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setCategory("startup")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
                category === "startup"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700/70 text-slate-200 hover:bg-slate-700"
              }`}
            >
              Startup
            </button>
            <button
              type="button"
              onClick={() => setCategory("commercial")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
                category === "commercial"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700/70 text-slate-200 hover:bg-slate-700"
              }`}
            >
              Commercial
            </button>
          </div>

          {/* Forms – separate components */}
          {category === "student" && <StudentForm />}
          {category === "startup" && <StartupForm />}
          {category === "commercial" && <CommercialForm />}
        </div>
      </div>
      <div className="text-center text-xs sm:text-sm text-slate-400 mt-6 sm:mt-8">
        I have an account?{" "}
        <Link to="/login" className="text-blue-300 hover:text-blue-200">
          Login
        </Link>
      </div>
    </div>
  );
}
