// src/components/register/CommercialForm.jsx
import React, { useState } from "react";

export default function CommercialForm() {
  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
    gstNumber: "",
    companyType: "",
    businessType: "",
    companyMobile: "",
    aadharNumber: "",
    companyAddress: "",
  });

  const [errors, setErrors] = useState({});

  const update = (k, v) =>
    setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e = {};

    if (!form.companyName.trim())
      e.companyName = "Company Name is required";
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.companyEmail))
      e.companyEmail = "Valid Company Email Address is required";

    if (!form.password) e.password = "Password is required";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!form.gstNumber.trim())
      e.gstNumber = "GST Number is required";

    if (!form.companyType.trim())
      e.companyType = "Company Type is required";

    if (!form.businessType.trim())
      e.businessType = "Business type is required";

    if (!/^[0-9]{7,15}$/.test(form.companyMobile || ""))
      e.companyMobile = "Company Mobile must be 7–15 digits";

    if (!/^[0-9]{12}$/.test(form.aadharNumber || ""))
      e.aadharNumber = "Aadhar Number must be 12 digits";

    if (!form.companyAddress.trim())
      e.companyAddress = "Company Address is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    console.log("Commercial registration:", form);
    alert("Commercial registration submitted (demo). Check console.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company Name + Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Company Name</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
          />
          {errors.companyName && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.companyName}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Company Email Address</label>
          <input
            type="email"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.companyEmail}
            onChange={(e) => update("companyEmail", e.target.value)}
          />
          {errors.companyEmail && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.companyEmail}
            </p>
          )}
        </div>
      </div>

      {/* Password + Confirm */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
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
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.confirmPassword}
            onChange={(e) =>
              update("confirmPassword", e.target.value)
            }
          />
          {errors.confirmPassword && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* GST / Type / Business */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">GST Number</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.gstNumber}
            onChange={(e) => update("gstNumber", e.target.value)}
          />
          {errors.gstNumber && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.gstNumber}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Company Type</label>
          <input
            placeholder="e.g. Pvt Ltd"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.companyType}
            onChange={(e) => update("companyType", e.target.value)}
          />
          {errors.companyType && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.companyType}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Business type (like scale)</label>
          <input
            placeholder="e.g. Small / Medium / Retail"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
          />
          {errors.businessType && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.businessType}
            </p>
          )}
        </div>
      </div>

      {/* Mobile + Aadhar */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Company Mobile Number</label>
          <input
            inputMode="numeric"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.companyMobile}
            onChange={(e) =>
              update("companyMobile", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.companyMobile && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.companyMobile}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Aadhar Number</label>
          <input
            maxLength={12}
            inputMode="numeric"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.aadharNumber}
            onChange={(e) =>
              update("aadharNumber", e.target.value.replace(/\D/g, ""))
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
        <label className="text-sm">Compnay Address</label>
        <input
          className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
          value={form.companyAddress}
          onChange={(e) =>
            update("companyAddress", e.target.value)
          }
        />
        {errors.companyAddress && (
          <p className="text-xs text-rose-400 mt-1">
            {errors.companyAddress}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-xl bg-white text-slate-900 font-semibold"
      >
        Register as Commercial
      </button>
    </form>
  );
}
