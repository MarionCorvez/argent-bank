import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [
    react(),
    pages({
      dirs: "src/pages",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@img": path.resolve(__dirname, "src/assets/img"),
      "@data": path.resolve(__dirname, "src/assets/data"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@partials": path.resolve(__dirname, "src/partials"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
});
