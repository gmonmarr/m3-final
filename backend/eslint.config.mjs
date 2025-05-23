// eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules", ".env", "coverage"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // 👇 Allow unused variables that start with '_'
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
  {
    files: ["tests/**/*.js", "**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
]);
