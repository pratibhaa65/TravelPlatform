import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    token: null,
    user: null,
    loading: true,
  });

  // Load auth from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token && role) {
      setAuth({
        isAuthenticated: true,
        role,
        token,
        user: storedUser,
        loading: false,
      });
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Login function
  const login = (token, role, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuth({
      isAuthenticated: true,
      role,
      token,
      user: userData,
      loading: false,
    });
  };


  // Logout
  const logout = () => {
    localStorage.clear();
    setAuth({
      isAuthenticated: false,
      role: null,
      token: null,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
