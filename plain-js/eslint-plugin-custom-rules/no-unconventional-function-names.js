const allowedFunctionPrefixes = [
  "is",
  "are",
  "has",
  "create",
  "on",
  "calculate",
];

function isValidFunctionName(name) {
  return allowedFunctionPrefixes.some((prefix) => prefix.startsWith(name));
}

module.exports = {
  name: "no-unconventional-function-names",
  meta: {
    type: "problem",
    messages: {
      invalidName: `function name should start with on of these words - ${allowedFunctionPrefixes.join(
        ","
      )}`,
    },
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (!isValidFunctionName(node.id.name)) {
          context.report({
            messageId: "invalidName",
            node,
          });
        }
      },
    };
  },
};
