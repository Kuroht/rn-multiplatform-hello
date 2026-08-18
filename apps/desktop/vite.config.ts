import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const workspaceRoot = path.resolve(__dirname, "../..");

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: [
      // Redirect any "react-native" import (including inside the shared
      // package) to react-native-web so the same components render in
      // the Electron renderer (a Chromium web view). Using
      // require.resolve here avoids bare-specifier resolution quirks.
      {
        find: /^react-native$/,
        replacement: require.resolve("react-native-web"),
      },
    ],
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
    ],
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
  },
  server: {
    port: 5173,
    strictPort: true,
    fs: {
      // Allow Vite to read the shared package which lives outside apps/desktop
      allow: [workspaceRoot],
    },
  },
  optimizeDeps: {
    include: ["react-native-web"],
  },
});
