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
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // allow only digits, optional max length
  const allowOnlyNumbers = (key, value, maxLen) => {
    const cleaned = (value || "").replace(/\D/g, "");
    update(key, typeof maxLen === "number" ? cleaned.slice(0, maxLen) : cleaned);
  };

  // allow only letters, spaces and common punctuation (no digits)
  const allowOnlyChars = (key, value) => {
    const cleaned = (value || "").replace(/[0-9]/g, "");
    const filtered = cleaned.replace(/[^A-Za-z\u00C0-\u017F\s\-\.'&,()]/g, "");
    update(key, filtered);
  };

  // allow letters, digits, - and / and space
  const allowAlphaNumeric = (key, value, maxLen) => {
    const cleaned = (value || "").replace(/[^A-Za-z0-9\-\s\/_.]/g, "");
    update(key, typeof maxLen === "number" ? cleaned.slice(0, maxLen) : cleaned);
  };

  function validate() {
    const e = {};

    // full name: required, at least 2 chars, no digits
    if (!form.fullName.trim()) e.fullName = "Full Name is required";
    else if (form.fullName.trim().length < 2)
      e.fullName = "Full Name must be at least 2 characters";
    else if (/[0-9]/.test(form.fullName))
      e.fullName = "Full Name should not contain numbers";

    // email
    if (!form.email.trim())
      e.email = "Email is required";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(form.email))
      e.email = "Valid Email Address is required";

    // password rules: required, min 8, at least 1 letter and 1 digit
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    else if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password))
      e.password = "Password must contain letters and numbers";

    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    // location required and characters only
    if (!form.country.trim()) e.country = "Country is required";
    else if (/[0-9]/.test(form.country)) e.country = "Country should not include numbers";

    if (!form.state.trim()) e.state = "State is required";
    else if (/[0-9]/.test(form.state)) e.state = "State should not include numbers";

    if (!form.city.trim()) e.city = "City is required";
    else if (/[0-9]/.test(form.city)) e.city = "City should not include numbers";

    // university / dept / course
    if (!form.universityName.trim()) e.universityName = "University Name is required";
    if (!form.department.trim()) e.department = "Department is required";
    if (!form.course.trim()) e.course = "Course is required";

    // semester: numeric, integer between 1 and 12 (adjust if you allow more)
    if (!form.semester.toString().trim()) e.semester = "Semester is required";
    else {
      const sem = Number(form.semester);
      if (!Number.isInteger(sem) || sem < 1 || sem > 12)
        e.semester = "Semester must be an integer between 1 and 12";
    }

    // endOfSemester: accept formats like "Dec 2026", "December 2026", "12/2026", "2026-12"
    if (!form.endOfSemester.trim()) e.endOfSemester = "End of Semester is required";
    else {
      const v = form.endOfSemester.trim();
      const patterns = [
        /^[A-Za-z]{3,9}\s\d{4}$/, // "Dec 2026" or "December 2026"
        /^(0?[1-9]|1[0-2])\/\d{4}$/, // "12/2026"
        /^\d{4}-?(0[1-9]|1[0-2])$/, // "2026-12" or "202612"
      ];
      if (!patterns.some((p) => p.test(v)))
        e.endOfSemester = 'End of Semester must be like "Dec 2026" or "12/2026" or "2026-12"';
    }

    // aadhar 12 digits
    if (!/^[0-9]{12}$/.test(form.aadharNumber || ""))
      e.aadharNumber = "Aadhar Number must be exactly 12 digits";

    // address
    if (!form.address.trim()) e.address = "Address is required";
    else if (form.address.trim().length < 5)
      e.address = "Address is too short";

    // mobile 7-15 digits
    if (!/^[0-9]{7,15}$/.test(form.mobileNumber || ""))
      e.mobileNumber = "Mobile Number must be 7–15 digits";

    // enrollment no (alphanumeric, min length)
    if (!form.enrollmentNo.trim()) e.enrollmentNo = "Enrollment No is required";
    else if (!/^[A-Za-z0-9\-\/_.]{3,}$/.test(form.enrollmentNo))
      e.enrollmentNo = "Enrollment No should be alphanumeric (min 3 chars)";

    // college id card
    if (!form.collegeIdCard.trim()) e.collegeIdCard = "College ID Card is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const responce = await fetch(
        "https://navkalpit-backend.onrender.com/api/register/student/",
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
            country: form.country,
            state: form.state,
            city: form.city,
            university_name: form.universityName,
            department: form.department,
            course: form.course,
            semester: form.semester,
            end_of_semester: form.endOfSemester,
            aadhar_number: form.aadharNumber,
            address: form.address,
            mobile_number: form.mobileNumber,
            enrollment_no: form.enrollmentNo,
            college_id_card: form.collegeIdCard,
          }),
        }
      );
      if (!responce.ok) {
        const errorData = await responce.json();
        console.error("Server errors:", errorData);
        alert("Failed to register student. Check console for errors.");
        return;
      }

      const data = await responce.json();
      console.log("Student registration successfull:", data);
      alert("Student register successful");

      // Reset form
      setForm({
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
            placeholder="you@student.edu"
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
            placeholder="Min 8 chars, include letters & numbers"
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

      {/* Country / State / City */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Country</label>
          <input
            placeholder="India"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.country}
            onChange={(e) => allowOnlyChars("country", e.target.value)}
          />
          {errors.country && (
            <p className="text-xs text-rose-400 mt-1">{errors.country}</p>
          )}
        </div>
        <div>
          <label className="text-sm">State</label>
          <input
            placeholder="Gujarat"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.state}
            onChange={(e) => allowOnlyChars("state", e.target.value)}
          />
          {errors.state && (
            <p className="text-xs text-rose-400 mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="text-sm">City</label>
          <input
            placeholder="Rajkot"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.city}
            onChange={(e) => allowOnlyChars("city", e.target.value)}
          />
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">University Name</label>
          <input
            placeholder="Marwadi University"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.universityName}
            onChange={(e) => allowOnlyChars("universityName", e.target.value)}
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
            placeholder="Computer Science"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.department}
            onChange={(e) => allowOnlyChars("department", e.target.value)}
          />
          {errors.department && (
            <p className="text-xs text-rose-400 mt-1">{errors.department}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Course</label>
          <input
            placeholder="BCA / MCA"
            inputMode="text"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.course}
            onChange={(e) => allowOnlyChars("course", e.target.value)}
          />
          {errors.course && (
            <p className="text-xs text-rose-400 mt-1">{errors.course}</p>
          )}
        </div>
      </div>

      {/* Semester / End of Semester */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Semester</label>
          <input
            placeholder="1 - 12"
            inputMode="numeric"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.semester}
            onChange={(e) =>
              // allow only digits, no decimals
              allowOnlyNumbers("semester", e.target.value, 2)
            }
          />
          {errors.semester && (
            <p className="text-xs text-rose-400 mt-1">{errors.semester}</p>
          )}
        </div>
        <div>
          <label className="text-sm">End of Semester</label>
          <input
            placeholder='2026'
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.endOfSemester}
            onChange={(e) => update("endOfSemester", e.target.value)}
          />
          {errors.endOfSemester && (
            <p className="text-xs text-rose-400 mt-1">{errors.endOfSemester}</p>
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
            placeholder="12 digits"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.aadharNumber}
            onChange={(e) => allowOnlyNumbers("aadharNumber", e.target.value, 12)}
          />
          {errors.aadharNumber && (
            <p className="text-xs text-rose-400 mt-1">{errors.aadharNumber}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Address (Aadhar Card Based)</label>
          <input
            placeholder="Address as in Aadhar card"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
          {errors.address && (
            <p className="text-xs text-rose-400 mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Mobile Number</label>
          <input
            inputMode="numeric"
            placeholder="Mobile Number"
            maxLength={15}
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.mobileNumber}
            onChange={(e) => allowOnlyNumbers("mobileNumber", e.target.value, 15)}
          />
          {errors.mobileNumber && (
            <p className="text-xs text-rose-400 mt-1">{errors.mobileNumber}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Enrollment No</label>
          <input
            placeholder="Alphanumeric enrollment no"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.enrollmentNo}
            onChange={(e) => allowAlphaNumeric("enrollmentNo", e.target.value, 30)}
          />
          {errors.enrollmentNo && (
            <p className="text-xs text-rose-400 mt-1">{errors.enrollmentNo}</p>
          )}
        </div>
        <div>
          <label className="text-sm">College idCard</label>
          <input
            placeholder="College ID printed on your card"
            className="w-full mt-1 p-2 rounded-md bg-slate-900 border border-slate-700"
            value={form.collegeIdCard}
            onChange={(e) => allowAlphaNumeric("collegeIdCard", e.target.value, 30)}
          />
          {errors.collegeIdCard && (
            <p className="text-xs text-rose-400 mt-1">{errors.collegeIdCard}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-xl bg-white text-slate-900 font-semibold"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register as Student"}
      </button>
    </form>
  );
}
