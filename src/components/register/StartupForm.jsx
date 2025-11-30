// src/components/register/StartupForm.jsx
import React, { useState } from "react";

export default function StartupForm() {
  const [form, setForm] = useState({
    username: "",
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
    ownerName: "",
    companyMobile: "",
    dpCertificate: "no", // yes | no
    dpCertificateNumber: "",
    udyamCertificate: "no", // yes | no
    udyamCertificateNumber: "",
    companyType: "",
    ownerAadhar: "",
    gstNumber: "",
    companyDescription: "",
  });

  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(form.username))
      e.username =
        "Username must be 3–20 characters (letters, numbers, _. - allowed)";

    if (!form.companyName.trim()) e.companyName = "Company Name is required";
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.companyEmail))
      e.companyEmail = "Valid Company Email Address is required";

    if (!form.password) e.password = "Password is required";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!form.ownerName.trim()) e.ownerName = "Owner Name is required";

    if (!/^[0-9]{7,15}$/.test(form.companyMobile || ""))
      e.companyMobile = "Company Mobile must be 7–15 digits";

    if (!form.companyType.trim()) e.companyType = "Company type is required";

    if (!/^[0-9]{12}$/.test(form.ownerAadhar || ""))
      e.ownerAadhar = "Owner Aadhar must be 12 digits";

    if (!form.gstNumber.trim()) e.gstNumber = "GST Number is required";

    if (!form.companyDescription.trim())
      e.companyDescription = "Description is required";
    else {
      const wordCount = form.companyDescription.trim().split(/\s+/).length;
      if (wordCount > 200) e.companyDescription = "Max 200 words allowed";
    }

    if (form.dpCertificate === "yes" && !form.dpCertificateNumber.trim())
      e.dpCertificateNumber = "DP Certificate Number required";

    if (form.udyamCertificate === "yes" && !form.udyamCertificateNumber.trim())
      e.udyamCertificateNumber = "Udyam Certificate Number required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    console.log("Startup registration:", form);
    alert("Startup registration submitted (demo). Check console.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company Name + Email */}

      {/* Username */}
      <div>
        <label className="text-sm">Username</label>
        <input
          className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
          value={form.username}
          onChange={(e) => update("username", e.target.value)}
        />
        {errors.username && (
          <p className="text-xs text-rose-400 mt-1">{errors.username}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Company Name</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
          />
          {errors.companyName && (
            <p className="text-xs text-rose-400 mt-1">{errors.companyName}</p>
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
            <p className="text-xs text-rose-400 mt-1">{errors.companyEmail}</p>
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
            onChange={(e) => update("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Owner + Mobile */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Owner Name</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.ownerName}
            onChange={(e) => update("ownerName", e.target.value)}
          />
          {errors.ownerName && (
            <p className="text-xs text-rose-400 mt-1">{errors.ownerName}</p>
          )}
        </div>
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
            <p className="text-xs text-rose-400 mt-1">{errors.companyMobile}</p>
          )}
        </div>
      </div>

      {/* DP Certificate */}
      <div>
        <label className="text-sm">DP_id_Certificate (Yes / No)</label>
        <div className="flex gap-3 mt-1 items-center">
          <select
            className="w-40 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.dpCertificate}
            onChange={(e) => update("dpCertificate", e.target.value)}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          {form.dpCertificate === "yes" && (
            <input
              placeholder="Certificate Number"
              className="flex-1 p-2 rounded-md bg-slate-900 border border-slate-700"
              value={form.dpCertificateNumber}
              onChange={(e) => update("dpCertificateNumber", e.target.value)}
            />
          )}
        </div>
        {errors.dpCertificateNumber && (
          <p className="text-xs text-rose-400 mt-1">
            {errors.dpCertificateNumber}
          </p>
        )}
      </div>

      {/* Udyam Certificate */}
      <div>
        <label className="text-sm">Udyam Certificate (Yes / No)</label>
        <div className="flex gap-3 mt-1 items-center">
          <select
            className="w-40 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.udyamCertificate}
            onChange={(e) => update("udyamCertificate", e.target.value)}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          {form.udyamCertificate === "yes" && (
            <input
              placeholder="Certificate Number"
              className="flex-1 p-2 rounded-md bg-slate-900 border border-slate-700"
              value={form.udyamCertificateNumber}
              onChange={(e) => update("udyamCertificateNumber", e.target.value)}
            />
          )}
        </div>
        {errors.udyamCertificateNumber && (
          <p className="text-xs text-rose-400 mt-1">
            {errors.udyamCertificateNumber}
          </p>
        )}
      </div>

      {/* Type / Aadhar / GST */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Company type</label>
          <input
            placeholder="Private Limited, LLP, etc."
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.companyType}
            onChange={(e) => update("companyType", e.target.value)}
          />
          {errors.companyType && (
            <p className="text-xs text-rose-400 mt-1">{errors.companyType}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Owner Adhar Card</label>
          <input
            maxLength={12}
            inputMode="numeric"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.ownerAadhar}
            onChange={(e) =>
              update("ownerAadhar", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.ownerAadhar && (
            <p className="text-xs text-rose-400 mt-1">{errors.ownerAadhar}</p>
          )}
        </div>
        <div>
          <label className="text-sm">GST Number</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.gstNumber}
            onChange={(e) => update("gstNumber", e.target.value)}
          />
          {errors.gstNumber && (
            <p className="text-xs text-rose-400 mt-1">{errors.gstNumber}</p>
          )}
        </div>
      </div>

      {/* Company Description */}
      <div>
        <label className="text-sm">Compnay Description in 200 Words</label>
        <textarea
          rows={4}
          className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
          value={form.companyDescription}
          onChange={(e) => update("companyDescription", e.target.value)}
        />
        {errors.companyDescription && (
          <p className="text-xs text-rose-400 mt-1">
            {errors.companyDescription}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-xl bg-white text-slate-900 font-semibold"
      >
        Register as Startup
      </button>
    </form>
  );
}
