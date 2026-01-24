import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => ({
  // Local dev MUST be "/"
  // Build can later be changed for GitHub Pages
  base: command === "build" ? "/mom-s-birthday-surprise/" : "/",

  plugins: [react()],

  server: {
    host: "localhost",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
