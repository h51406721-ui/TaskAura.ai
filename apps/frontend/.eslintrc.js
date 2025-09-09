module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",              // Next.js recommended rules
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
 env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"], // TS cleanup
    "react/react-in-jsx-scope": "off",             // Next.js doesn’t need React import
  },
};
