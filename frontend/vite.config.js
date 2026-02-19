import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/api": `${import.meta.env.VITE_BACKEND_URL}`,
    // },
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  },
});
