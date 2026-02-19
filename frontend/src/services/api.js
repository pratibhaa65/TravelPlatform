import axios from "axios";

const raw = import.meta.env.VITE_BACKEND_URL;
const baseURL = (typeof raw === "string" ? raw.trim() : "") || "http://localhost:8000";
const API = axios.create({
  baseURL: `${baseURL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
