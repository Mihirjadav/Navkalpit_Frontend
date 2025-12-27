import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    // basic validations
    if (!email) {
      return setError("Enter your email");
    }
    if (!password) {
      return setError("Enter your password");
    }

    setError(null);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password");
        return;
      }

      // Save tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Decode token to get user_type
      const payload = JSON.parse(atob(data.access.split(".")[1]));
      const userType = payload.user_type;

      // Redirect based on user type
      if (userType === "student") {
        window.location.href = "/student/dashboard";
      } else if (userType === "startup") {
        window.location.href = "/startup/dashboard";
      } else if (userType === "commercial") {
        window.location.href = "/commercial/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-black from-slate-900 to-black text-slate-100 py-12 sm:py-16 md:py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Log In</h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-xs sm:text-sm text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700 text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-xs sm:text-sm text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700 text-sm sm:text-base"
              />
              {/* Forgot Password link */}
              <div className="mt-2 text-right">
                <Link
                  to="/newpassword"
                  className="text-xs text-blue-300 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-rose-400 text-xs sm:text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-xs sm:text-sm text-slate-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-300">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
