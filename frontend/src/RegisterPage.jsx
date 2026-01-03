import React, { useState } from "react";
import PasswordShowHide from "./Passwordshowhide";
import { Link } from "react-router-dom";
import API from "./services/api";
import Navbar from "./LandingPages/components/Navbar";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  if (password.length < 8) {
    setPasswordError("Password must be at least 8 characters long");
    return;
  }

  if (confirmPassword && password !== confirmPassword) {
    setPasswordError("Passwords do not match");
    return;
  }

  try {
    const res = await API.post("/users/register", {
      name: fullName,
      email,
      password,
      role,
    });

    console.log("REGISTER SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    if (res.data.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/user";
    }

  } catch (error) {
    setPasswordError(
      error.response?.data?.message || "Registration failed"
    );
  }
};

  return (
    <div className="px-28">
      <Navbar />
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-300 rounded-xl shadow-md overflow-hidden">
        {/* Image side */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Travel banner"
            className="w-full h-full object-cover curved-l-xl"
          />
        </div>

        {/* Form side */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">Register</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <PasswordShowHide
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordError={passwordError}
            />
            <div className="h-4"></div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mb-6 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-900 cursor-pointer hover:underline"
              >
                Login Now
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
