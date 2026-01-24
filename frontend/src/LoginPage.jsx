import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "./utils/authContext";
import Header from "./LandingPages/components/Header";
import PasswordShowHide from "./Passwordshowhide";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setPasswordError("Email is required");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setPasswordError("");

    try {
      const res = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
        role
      });

      console.log("LOGIN SUCCESS:", res.data);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      login(res.data.token, res.data.role);

      navigate(res.data.role === "admin" ? "/admindashboard" : "/userdashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setPasswordError(
        error.response?.data?.message || "Login failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-28">
      < Header />
      <div className="min-h-screen flex items-center md:items-center justify-center px-4 py-8">
        <div className="flex flex-col md:flex-row w-full md:max-w-3xl bg-gray-100 rounded-xl shadow-md overflow-hidden">

          <div className="hidden md:block md:w-1/2">
            <img
              src="logreg.png"
              alt="Travel banner"
              className="w-full h-full object-cover curved-l-xl"
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-4xl font-semibold text-blue-900 mb-8 text-center">
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
                className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition">
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
