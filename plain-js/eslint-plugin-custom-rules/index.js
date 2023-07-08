module.exports = {
  configs: {
    recommended: {
      rules: {
        // "custom-rules/no-unconventional-function-names": "error",
      },
    },
  },
  rules: {
    "no-unconventional-function-names": require("./no-unconventional-function-names"),
    "no-unstable-leak": require("./no-unstable-leak"),
    "no-wrong-import": require("./no-wrong-import"),
    "no-wrong-import-2": require("./no-wrong-import-2"),
  },
};
