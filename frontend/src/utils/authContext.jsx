import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    token: null,
    loading: true,  
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setAuth({
        isAuthenticated: true,
        role,
        token,
        loading: false,  
      });
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ isAuthenticated: true, role, token, loading: false });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ isAuthenticated: false, role: null, token: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
