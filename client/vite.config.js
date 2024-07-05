import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "src/app"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@api": path.resolve(__dirname, "src/features/api"),
      "@users": path.resolve(__dirname, "src/features/users"),
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
