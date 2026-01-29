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
        role,
      });

      console.log("LOGIN SUCCESS:", JSON.stringify(res.data, null, 2));

      // Use the response data directly, no res.data.user
      login(res.data.token, res.data.role, {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      });

      // Redirect after login
      navigate(res.data.role === "admin" ? "/admindashboard" : "/userdashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setPasswordError(error.response?.data?.message || "Login failed, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-28">
      < Header />
      <div className="flex items-center md:items-center justify-center px-4 py-28">
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

              <div className="h-4" />

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">
                  Or continue with
                </span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border bg-white px-6 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">Google</span>
                </button>
              </div>

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