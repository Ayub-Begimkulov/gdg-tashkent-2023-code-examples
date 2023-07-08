import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

export const strictEnum = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    messages: {
      noConstEnum: "const enums are not allowed",
      noNonLiteralMember: "enums can not have non literal members",
      onlyStringMembers: "enums should have only literal string members",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      TSEnumDeclaration(node) {
        if (node.const) {
          context.report({
            node,
            messageId: "noConstEnum",
          });
        }
      },
      TSEnumMember(node) {
        if (node.initializer?.type !== AST_NODE_TYPES.Literal) {
          return context.report({
            node,
            messageId: "noNonLiteralMember",
          });
        }

        if (typeof node.initializer.value !== "string") {
          context.report({
            node,
            messageId: "onlyStringMembers",
          });
        }
      },
    };
  },
});
