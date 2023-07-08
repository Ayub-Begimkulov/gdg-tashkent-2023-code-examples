const path = require("path");
const unstablePrefix = "unstable_";

module.exports = {
  name: "no-unstable-leak",
  meta: {
    type: "problem",
    messages: {
      invalidDeclaration:
        "invalid unstable usage, can not declare unstable " +
        "function outside of the unstable files.",
      invalidCall:
        "invalid unstable usage, can not call unstable " +
        "function outside of the unstable files.",
    },
  },
  create(context) {
    const fileName = path.basename(context.getFilename());

    return {
      FunctionDeclaration(node) {
        if (
          node.id.name.startsWith(unstablePrefix) &&
          !fileName.startsWith(unstablePrefix)
        ) {
          context.report({
            node,
            messageId: "invalidDeclaration",
          });
        }
      },
      CallExpression(node) {
        if (
          node.callee.name?.startsWith(unstablePrefix) &&
          !fileName.startsWith(unstablePrefix)
        ) {
          context.report({
            node,
            messageId: "invalidCall",
          });
        }
      },
      VariableDeclarator(node) {
        const name = node.id.name;

        if (
          node.init.type !== "ArrowFunctionExpression" &&
          node.init.type !== "FunctionExpression"
        ) {
          return;
        }

        if (
          name.startsWith(unstablePrefix) &&
          !fileName.startsWith(unstablePrefix)
        ) {
          context.report({
            node,
            messageId: "invalidDeclaration",
          });
        }
      },
    };
  },
};
