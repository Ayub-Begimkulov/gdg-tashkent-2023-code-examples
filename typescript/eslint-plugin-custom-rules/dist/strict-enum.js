"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictEnum = void 0;
const utils_1 = require("@typescript-eslint/utils");
exports.strictEnum = utils_1.ESLintUtils.RuleCreator.withoutDocs({
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
                var _a;
                if (((_a = node.initializer) === null || _a === void 0 ? void 0 : _a.type) !== utils_1.AST_NODE_TYPES.Literal) {
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
