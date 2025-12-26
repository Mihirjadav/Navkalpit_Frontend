import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UnifiedRegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // Allow only letters and spaces for full name
  const allowOnlyChars = (key, value) => {
    const cleaned = (value || "").replace(/[0-9]/g, "");
    const filtered = cleaned.replace(/[^A-Za-z\u00C0-\u017F\s\-\.'&,()]/g, "");
    update(key, filtered);
  };

  // Allow only digits for mobile number
  const allowOnlyNumbers = (key, value, maxLen) => {
    const cleaned = (value || "").replace(/\D/g, "");
    update(
      key,
      typeof maxLen === "number" ? cleaned.slice(0, maxLen) : cleaned
    );
  };

  function validate() {
    const e = {};

    // Full Name validation
    if (!form.fullName.trim()) {
      e.fullName = "Full Name is required";
    } else if (form.fullName.trim().length < 2) {
      e.fullName = "Full Name must be at least 2 characters";
    } else if (/[0-9]/.test(form.fullName)) {
      e.fullName = "Full Name should not contain numbers";
    }

    // Email validation
    if (!form.email.trim()) {
      e.email = "Email ID is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(form.email)
    ) {
      e.email = "Valid Email Address is required";
    }

    // Mobile Number validation
    if (!form.mobileNumber.trim()) {
      e.mobileNumber = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobileNumber)) {
      e.mobileNumber = "Mobile Number must be exactly 10 digits";
    }

    // Password validation
    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters";
    } else if (
      !/[A-Za-z]/.test(form.password) ||
      !/[0-9]/.test(form.password)
    ) {
      e.password = "Password must contain letters and numbers";
    }

    // Confirm Password validation
    if (!form.confirmPassword) {
      e.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Passwords do not match";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://navkalpit-backend.onrender.com/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: form.fullName,
            email: form.email,
            mobile_number: form.mobileNumber,
            password: form.password,
            confirm_password: form.confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error(err);
        alert(err.message || "Failed to register. Please try again.");
        setLoading(false);
        return;
      }

      alert("Registration successful! Please login.");
      setForm({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-black from-slate-900 to-black text-slate-100 py-20">
      <div className="max-w-md mx-auto">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Register</h2>
          <p className="text-sm text-slate-400 mb-6">Fill the details</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => allowOnlyChars("fullName", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter full name"
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email ID */}
            <div>
              <label className="block text-sm font-medium mb-2">Email ID</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter email"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                value={form.mobileNumber}
                onChange={(e) =>
                  allowOnlyNumbers("mobileNumber", e.target.value, 10)
                }
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter mobile number"
                disabled={loading}
                maxLength="10"
              />
              {errors.mobileNumber && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter password"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Confirm password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
