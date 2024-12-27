import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; 

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://mern-real-estate-app-2nqr.onrender.com",
      },
    },
  },
  plugins: [react()],
});
