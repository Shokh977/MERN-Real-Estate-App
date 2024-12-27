import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; 

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://mern-real-estate-app-2nqr.onrender.com", // Ensure this URL is correct
        secure: false, // Set to false if you're using HTTP on your backend
      },
    },
  },
  plugins: [react()],
});
