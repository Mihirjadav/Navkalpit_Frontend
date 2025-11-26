// src/components/register/StudentForm.jsx
import React, { useState } from "react";

export default function StudentForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    universityName: "",
    department: "",
    course: "",
    semester: "",
    endOfSemester: "",
    aadharNumber: "",
    address: "",
    mobileNumber: "",
    enrollmentNo: "",
    collegeIdCard: "",
  });

  const [errors, setErrors] = useState({});

  const update = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate() {
    const e = {};

    if (!form.fullName.trim()) e.fullName = "Full Name is required";
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email))
      e.email = "Valid Email Address is required";

    if (!form.password) e.password = "Password is required";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!form.country) e.country = "Country is required";
    if (!form.state) e.state = "State is required";
    if (!form.city) e.city = "City is required";

    if (!form.universityName)
      e.universityName = "University Name is required";
    if (!form.department) e.department = "Department is required";
    if (!form.course) e.course = "Course is required";
    if (!form.semester) e.semester = "Semester is required";
    if (!form.endOfSemester)
      e.endOfSemester = "End of Semester is required";

    if (!/^[0-9]{12}$/.test(form.aadharNumber || ""))
      e.aadharNumber = "Aadhar Number must be 12 digits";

    if (!form.address) e.address = "Address is required";

    if (!/^[0-9]{7,15}$/.test(form.mobileNumber || ""))
      e.mobileNumber = "Mobile Number must be 7–15 digits";

    if (!form.enrollmentNo)
      e.enrollmentNo = "Enrollment No is required";

    if (!form.collegeIdCard)
      e.collegeIdCard = "College ID Card is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    console.log("Student registration:", form);
    alert("Student registration submitted (demo). Check console.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name + Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Full Name</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
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

      {/* Country / State / City */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Country</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
          />
          {errors.country && (
            <p className="text-xs text-rose-400 mt-1">{errors.country}</p>
          )}
        </div>
        <div>
          <label className="text-sm">State</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
          />
          {errors.state && (
            <p className="text-xs text-rose-400 mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="text-sm">City</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      {/* University / Department / Course */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">University Name</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.universityName}
            onChange={(e) => update("universityName", e.target.value)}
          />
          {errors.universityName && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.universityName}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Department</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
          />
          {errors.department && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.department}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Course</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
          />
          {errors.course && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.course}
            </p>
          )}
        </div>
      </div>

      {/* Semester / End of Semester */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Semester</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.semester}
            onChange={(e) => update("semester", e.target.value)}
          />
          {errors.semester && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.semester}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">End of Semester</label>
          <input
            placeholder="e.g. Dec 2026"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.endOfSemester}
            onChange={(e) =>
              update("endOfSemester", e.target.value)
            }
          />
          {errors.endOfSemester && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.endOfSemester}
            </p>
          )}
        </div>
      </div>

      {/* Aadhar + Address */}
      <div className="grid md:grid-cols-2 gap-4">
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
        <div>
          <label className="text-sm">Address (Aadhar Card Based)</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
          {errors.address && (
            <p className="text-xs text-rose-400 mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Mobile / Enrollment / College ID */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Mobile Number</label>
          <input
            inputMode="numeric"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.mobileNumber}
            onChange={(e) =>
              update("mobileNumber", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.mobileNumber && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.mobileNumber}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">Enrollment No</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.enrollmentNo}
            onChange={(e) =>
              update("enrollmentNo", e.target.value)
            }
          />
          {errors.enrollmentNo && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.enrollmentNo}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm">College idCard</label>
          <input
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.collegeIdCard}
            onChange={(e) =>
              update("collegeIdCard", e.target.value)
            }
          />
          {errors.collegeIdCard && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.collegeIdCard}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-xl bg-white text-slate-900 font-semibold"
      >
        Register as Student
      </button>
    </form>
  );
}
