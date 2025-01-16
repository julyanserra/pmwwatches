import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused variables when prefixed with _
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      // More flexible prop types validation
      "react/prop-types": "off",
      // Allow both default and named exports
      "import/prefer-default-export": "off",
      // More flexible function component definition
      "react/function-component-definition": "off",
      // Less strict type checking
      "@typescript-eslint/no-explicit-any": "warn",
      // More flexible object type notation
      "@typescript-eslint/consistent-type-definitions": "off",
      // Allow empty interfaces
      "@typescript-eslint/no-empty-interface": "warn",
      // More flexible boolean prop naming
      "react/boolean-prop-naming": "off",
      // More flexible props spreading
      "react/jsx-props-no-spreading": "off"
    }
  }
];

export default eslintConfig;
