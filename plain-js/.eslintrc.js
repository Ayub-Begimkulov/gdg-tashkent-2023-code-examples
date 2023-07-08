module.exports = {
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  plugins: ["custom-rules"],
  rules: {
    "custom-rules/no-unstable-leak": "error",
    "custom-rules/no-wrong-import": "error",
  },
};
