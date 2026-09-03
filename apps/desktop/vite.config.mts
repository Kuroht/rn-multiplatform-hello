import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(projectRoot, "../..");
const sharedSrc = path.resolve(workspaceRoot, "packages/shared/src");

function nativewindImportRewrite(): Plugin {
  return {
    name: "nativewind-import-rewrite",

    enforce: "pre",

    transform(code, id) {
      if (!id.startsWith(sharedSrc)) {
        return null;
      }

      if (!/\.[cm]?[jt]sx?$/.test(id)) {
        return null;
      }

      const transformed = code.replace(
        /from\s+["']react-native["']/g,
        'from "react-native-css/react-native"',
      );

      return transformed === code
        ? null
        : {
            code: transformed,
            map: null,
          };
    },
  };
}

export default defineConfig({
  root: projectRoot,

  plugins: [
    nativewindImportRewrite(),
    react(),
  ],

  base: "./",

  resolve: {
    alias: [
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
    global: "globalThis",
  },

  server: {
    port: 5174,
    strictPort: true,

    fs: {
      allow: [workspaceRoot],
    },
  },

  optimizeDeps: {
    include: [
      "react-native-web",
      "react-native-css",
    ],
    esbuildOptions: {
      resolveExtensions: [
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
  },

  css: {
    postcss: path.resolve(projectRoot, "postcss.config.mjs"),
  },
});