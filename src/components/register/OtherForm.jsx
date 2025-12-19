import React, { useState } from "react";

export default function OtherForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    aadharNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  const allowOnlyNumbers = (key, value, maxLen) => {
    const cleaned = (value || "").replace(/\D/g, "");
    update(key, cleaned.slice(0, maxLen));
  };

  const allowOnlyChars = (key, value) => {
    const cleaned = (value || "").replace(/[0-9]/g, "");
    update(key, cleaned.replace(/[^A-Za-z\s\-\.'&,()]/g, ""));
  };

  function validate() {
    const e = {};

    if (!form.fullName.trim())
      e.fullName = "Full Name is required";

    if (!form.email.trim())
      e.email = "Email is required";
    else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(form.email)
    )
      e.email = "Valid Email Address is required";

    if (!form.password)
      e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";

    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!/^[0-9]{7,15}$/.test(form.mobile))
      e.mobile = "Mobile Number must be 7–15 digits";

    if (!/^[0-9]{12}$/.test(form.aadharNumber))
      e.aadharNumber = "Aadhar Number must be 12 digits";

    if (!form.address.trim())
      e.address = "Address is required";
    else if (form.address.trim().length < 5)
      e.address = "Address is too short";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://navkalpit-backend.onrender.com/api/register/other/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: form.fullName,
            email: form.email,
            password: form.password,
            confirm_password: form.confirmPassword,
            mobile_number: form.mobile,
            aadhar_number: form.aadharNumber,
            address: form.address,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error(err);
        alert("Failed to register Other User");
        return;
      }

      alert("Other User registered successfully");

      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        aadharNumber: "",
        address: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Full Name + Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Full Name</label>
          <input
            placeholder="John Doe"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.fullName}
            onChange={(e) => allowOnlyChars("fullName", e.target.value)}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Password + Confirm Password */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
          {errors.password && (
            <p className="text-xs text-rose-400 mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="text-sm">Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat password"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Mobile + Aadhar */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Mobile Number</label>
          <input
            inputMode="numeric"
            placeholder="Mobile Number"
            maxLength={15}
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.mobile}
            onChange={(e) =>
              allowOnlyNumbers("mobile", e.target.value, 15)
            }
          />
          {errors.mobile && (
            <p className="text-xs text-rose-400 mt-1">{errors.mobile}</p>
          )}
        </div>

        <div>
          <label className="text-sm">Aadhar Number</label>
          <input
            maxLength={12}
            inputMode="numeric"
            placeholder="12 digits"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.aadharNumber}
            onChange={(e) =>
              allowOnlyNumbers("aadharNumber", e.target.value, 12)
            }
          />
          {errors.aadharNumber && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.aadharNumber}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-sm">Address</label>
        <input
          placeholder="Complete address"
          className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
        />
        {errors.address && (
          <p className="text-xs text-rose-400 mt-1">{errors.address}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-3 rounded-xl bg-white text-slate-900 font-semibold"
      >
        {loading ? "Registering..." : "Register as Other User"}
      </button>
    </form>
  );
}
