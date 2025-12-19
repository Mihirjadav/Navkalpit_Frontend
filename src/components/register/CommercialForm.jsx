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
    hasUdyam: "",
    udyamCertificate: "",
    dpId: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // allow only digits, optional max length
  const allowOnlyNumbers = (key, value, maxLen) => {
    const cleaned = (value || "").replace(/\D/g, "");
    update(
      key,
      typeof maxLen === "number" ? cleaned.slice(0, maxLen) : cleaned
    );
  };

  // allow only letters, spaces and common punctuation (no digits)
  const allowOnlyChars = (key, value) => {
    const cleaned = (value || "").replace(/[0-9]/g, "");
    const filtered = cleaned.replace(/[^A-Za-z\u00C0-\u017F\s\-\.'&,()]/g, "");
    update(key, filtered);
  };

  // allow alphanumeric and a few symbols (for gst/company ids)
  const allowAlphaNumeric = (key, value, maxLen) => {
    const cleaned = (value || "").replace(/[^A-Za-z0-9\-\s\/_.]/g, "");
    update(
      key,
      typeof maxLen === "number" ? cleaned.slice(0, maxLen) : cleaned
    );
  };

  function validate() {
    const e = {};

    // companyName
    if (!form.companyName.trim()) e.companyName = "Company Name is required";
    else if (form.companyName.trim().length < 2)
      e.companyName = "Company Name must be at least 2 characters";

    // email
    if (!form.companyEmail.trim()) e.companyEmail = "Company Email is required";
    else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        form.companyEmail
      )
    )
      e.companyEmail = "Valid Company Email Address is required";

    // password
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    else if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password))
      e.password = "Password must contain letters and numbers";

    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    // GST validation (common GSTIN pattern)
    const gst = (form.gstNumber || "").toUpperCase().trim();
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i;
    if (!gst) e.gstNumber = "GST Number is required";
    else if (!gstPattern.test(gst))
      e.gstNumber = "GST Number must be a valid 15-character GSTIN";

    // companyType & businessType
    if (!form.companyType.trim()) e.companyType = "Company Type is required";
    if (!form.businessType.trim()) e.businessType = "Business type is required";

    // companyMobile
    if (!/^[0-9]{7,15}$/.test(form.companyMobile || ""))
      e.companyMobile = "Company Mobile must be 7–15 digits";

    // aadhar
    if (!/^[0-9]{12}$/.test(form.aadharNumber || ""))
      e.aadharNumber = "Aadhar Number must be exactly 12 digits";

    // address
    if (!form.companyAddress.trim())
      e.companyAddress = "Company Address is required";
    else if (form.companyAddress.trim().length < 5)
      e.companyAddress = "Company Address is too short";

    // hasUdyam
    if (!form.hasUdyam) e.hasUdyam = "Please select Udyam Certificate option";

    // udyamCertificate (if yes)
    if (form.hasUdyam === "yes" && !form.udyamCertificate.trim())
      e.udyamCertificate = "Udyam Certificate is required";

    // dpId
    // if (!form.dpId.trim()) e.dpId = "DP ID is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://navkalpit-backend.onrender.com/api/register/commercial/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_name: form.companyName,
            email: form.companyEmail,
            user_type: "commercial",
            password: form.password,
            confirm_password: form.confirmPassword,
            gst_number: form.gstNumber.toUpperCase(),
            company_type: form.companyType,
            business_type: form.businessType,
            company_mobile: form.companyMobile,
            aadhar_number: form.aadharNumber,
            company_address: form.companyAddress,
            dp_id: form.dpId,
            has_udyam: form.hasUdyam === 'yes',
            udyam_certificate: form.udyamCertificate === 'yes' ? form.udyamCertificate : null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server errors:", errorData);
        alert(
          `Error: ${
            errorData.message || "An error occurred. Please try again."
          }`
        );
        return;
      }

      const data = await response.json();
      console.log("Commercial registration successful:", data);
      alert("Commercial registration successful!");

      // Reset the form and errors
      setForm({
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
        hasUdyam: "",
        udyamCertificate: "",
        dpId: "",
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
    <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4 md:space-y-5 px-2 sm:px-4">
      {/* Company Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Company Name</label>
          <input
            placeholder="Navkalpit"
            inputMode="text"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.companyName}
            onChange={(e) => allowOnlyChars("companyName", e.target.value)}
          />
          {errors.companyName && (
            <p className="text-xs text-rose-400 mt-1">{errors.companyName}</p>
          )}
        </div>
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Company Email Address</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.companyEmail}
            onChange={(e) => update("companyEmail", e.target.value)}
          />
          {errors.companyEmail && (
            <p className="text-xs text-rose-400 mt-1">{errors.companyEmail}</p>
          )}
        </div>
      </div>

      {/* Password + Confirm */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Password</label>
          <input
            type="password"
            placeholder="Min 8 chars, include letters & numbers"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
          {errors.password && (
            <p className="text-xs text-rose-400 mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat password"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
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

      {/* GST / Type / Business */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">GST Number</label>
          <input
            placeholder="e.g. 27ABCDE1234F1Z5"
            maxLength={15}
            inputMode="text"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.gstNumber}
            onChange={(e) =>
              update(
                "gstNumber",
                e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 15)
              )
            }
          />
          {errors.gstNumber && (
            <p className="text-xs text-rose-400 mt-1">{errors.gstNumber}</p>
          )}
        </div>
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Company Type</label>
          <select
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.companyType}
            onChange={(e) => update("companyType", e.target.value)}
          >
            <option value="">Select Company Type</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Limited Liability Partnership">
              Limited Liability Partnership
            </option>
            <option value="Private Limited Company">
              Private Limited Company
            </option>
            <option value="Public Limited Company">
              Public Limited Company
            </option>
          </select>

          {errors.companyType && (
            <p className="text-xs text-rose-400 mt-1">{errors.companyType}</p>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Business Type</label>
          <select
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
          >
            <option value="">Select Business Type</option>
            <option value="Small Scale">Small Scale</option>
            <option value="Medium Scale">Medium Scale</option>
            <option value="Large Scale">Large Scale</option>
            <option value="Retail Business">Retail Business</option>
            <option value="Wholesale Business">Wholesale Business</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Service Provider">Service Provider</option>
          </select>

          {errors.businessType && (
            <p className="text-xs text-rose-400 mt-1">{errors.businessType}</p>
          )}
        </div>
      </div>

      {/* Mobile + Aadhar */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Company Mobile Number</label>
          <input
            inputMode="numeric"
            placeholder="Mobile Number"
            maxLength={15}
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.companyMobile}
            onChange={(e) =>
              allowOnlyNumbers("companyMobile", e.target.value, 15)
            }
          />
          {errors.companyMobile && (
            <p className="text-xs text-rose-400 mt-1">{errors.companyMobile}</p>
          )}
        </div>
        <div>
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Aadhar Number</label>
          <input
            maxLength={12}
            inputMode="numeric"
            placeholder="12 digits"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.aadharNumber}
            onChange={(e) =>
              allowOnlyNumbers("aadharNumber", e.target.value, 12)
            }
          />
          {errors.aadharNumber && (
            <p className="text-xs text-rose-400 mt-1">{errors.aadharNumber}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Company Address</label>
        <input
          placeholder="Street, area, city, state, PIN"
          className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
          value={form.companyAddress}
          onChange={(e) => update("companyAddress", e.target.value)}
        />
        {errors.companyAddress && (
          <p className="text-xs text-rose-400 mt-1">{errors.companyAddress}</p>
        )}
      </div>

      {/* DP ID */}
      <div>
        <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">DP ID</label>
        <input
          placeholder="Enter DP ID"
          className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
          value={form.dpId}
          onChange={(e) => update("dpId", e.target.value)}
        />
        {errors.dpId && (
          <p className="text-xs text-rose-400 mt-1">{errors.dpId}</p>
        )}
      </div>

      {/* Udyam Certificate */}
      <div>
        <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Do you have Udyam Certificate?</label>
        <select
          className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
          value={form.hasUdyam}
          onChange={(e) => {
            update("hasUdyam", e.target.value);
            if (e.target.value === "no") {
              update("udyamCertificate", "");
            }
          }}
        >
          <option value="">Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {errors.hasUdyam && (
          <p className="text-xs text-rose-400 mt-1">{errors.hasUdyam}</p>
        )}
      </div>

      {/* Udyam Certificate Number - Conditional */}
      {form.hasUdyam === "yes" && (
        <div className="animate-in fade-in duration-300">
          <label className="text-xs sm:text-sm block font-medium mb-1 sm:mb-1.5">Udyam Certificate Number</label>
          <input
            placeholder="Enter Udyam Certificate Number"
            className="w-full mt-0 p-2 sm:p-2.5 text-sm sm:text-base rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={form.udyamCertificate}
            onChange={(e) => update("udyamCertificate", e.target.value)}
          />
          {errors.udyamCertificate && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.udyamCertificate}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 md:py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm sm:text-base hover:bg-gray-100 transition duration-200 active:scale-95 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register as Commercial"}
      </button>
    </form>
  );
}
