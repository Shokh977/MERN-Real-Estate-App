import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "mern-real-estate-app-2nqr.onrender.com",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
