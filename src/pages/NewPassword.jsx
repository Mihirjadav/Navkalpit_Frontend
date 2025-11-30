import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newPass.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPass !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    alert("Password updated successfully!");
    setError("");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-300">New Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type={show ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full pl-10 pr-12 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-blue-500 outline-none"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-slate-300">Confirm New Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type={show ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full pl-10 pr-12 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-blue-500 outline-none"
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white text-black font-semibold mt-4"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
