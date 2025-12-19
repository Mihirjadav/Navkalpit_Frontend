// src/pages/Register.jsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StudentForm from "../components/register/StudentForm";
import OtherForm from "../components/register/OtherForm";
import CommercialForm from "../components/register/CommercialForm";

export default function Register() {
  const [category, setCategory] = useState("student");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Register</h1>
          <p className="text-sm text-slate-400 mb-6">
            Select your category and fill the form.
          </p>

          {/* Category Selection */}
          <div className="flex flex-wrap gap-3 mb-6" aria-label="Category">
            <button
              type="button"
              onClick={() => setCategory("student")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                category === "student"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700/70 text-slate-200"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setCategory("commercial")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                category === "commercial"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700/70 text-slate-200"
              }`}
            >
              Commercial
            </button>
            <button
              type="button"
              onClick={() => setCategory("other")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                category === "other"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700/70 text-slate-200"
              }`}
            >
              Other
            </button>
            
          </div>

          {/* Forms – separate components */}
          {category === "student" && <StudentForm />}
          {category === "commercial" && <CommercialForm />}
          {category === "other" && <OtherForm />}
        </div>
      </div>
      <div className="text-center text-sm text-slate-400 mt-4">
        I have an account?{" "}
        <Link to="/login" className="text-blue-300">
          Login
        </Link>
      </div>
    </div>
  );
}
