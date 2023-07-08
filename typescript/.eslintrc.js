module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "custom-rules"],
  root: true,
  rules: {
    "custom-rules/strict-enum": "error",
    // "no-restricted-syntax": [
    //   "error",
    //   {
    //     selector: "TSEnumDeclaration[const=true]",
    //     message: "const enums are not allowed.",
    //   },
    // ],
  },
  ignorePatterns: ["*.js", "eslint-plugin-custom-rules"],
};
