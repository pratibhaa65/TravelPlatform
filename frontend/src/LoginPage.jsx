import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PasswordShowHide from "./Passwordshowhide";
import API from "./services/api";
import Navbar from "./LandingPages/components/Navbar";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "admin") {
        window.location.href = "/admindashboard";
      } else {
        window.location.href = "/userdashboard";
      }

    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
<div className="px-28">

   <Navbar />
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-gray-300 rounded-xl shadow-md overflow-hidden">

        <div className="hidden md:block md:w-1/2">
          <img
            src=" https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Travel banner"
            className="w-full h-full object-cover curved-l-xl"


          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <PasswordShowHide
              type="password"
              placeholder="Password"
              password={password}
              setPassword={setPassword}
              showConfirm={false}     
              passwordError={passwordError}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-900 cursor-pointer hover:underline"
              >
                Register Now
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
