import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PasswordShowHide from "./Passwordshowhide";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({ email, password });
  };

  return (<div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
    <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-300 rounded-xl shadow-md overflow-hidden">

      {/* Image side */}
      <div className="hidden md:block md:w-1/2">
        <img
          src=" https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
          alt="Travel banner"
          className="w-full h-full object-cover curved-l-xl"


        />
      </div>

      {/* Form side */}
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
            showConfirm={false}     // ❗ important for login
            passwordError=""
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

          <Link
          to="/register"
          className="text-center block text-sm text-blue-600 mt-4 cursor-pointer hover:underline">
            Register Now
          </Link>
        </form>
      </div>
    </div>
  </div>

  );
};

export default LoginPage;
