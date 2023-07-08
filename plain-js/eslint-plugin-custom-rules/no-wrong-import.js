const path = require("path");

const allowedFolders = ["frontend", "backend", "shared"];
const allowedDependenciesMap = {
  frontend: ["frontend", "shared"],
  backend: ["backend", "shared"],
  shared: ["shared"],
};

module.exports = {
  name: "no-wrong-import",
  meta: {
    type: "problem",
    messages: {
      invalidImport: `the module {{source}} can not import {{target}}`,
      invalidFolder:
        `the folder containing this file doesn't follow correct architecture, ` +
        `allowed folder names - ${allowedFolders.join(",")}`,
    },
  },
  create(context) {
    return {
      "ImportDeclaration, ImportExpression"(node) {
        const fileName = context.getFilename();

        const usedFolder = allowedFolders.find((folder) =>
          fileName.includes(`/${folder}/`)
        );

        if (!usedFolder) {
          context.report({ node, messageId: "invalidFolder" });
        }

        const importSourceFile = path.join(
          path.dirname(fileName),
          node.source.value
        );
        const allowedDependencies = allowedDependenciesMap[usedFolder];

        if (
          !allowedDependencies.some((dependencyFolder) =>
            importSourceFile.includes(`/${dependencyFolder}/`)
          )
        ) {
          context.report({
            node,
            messageId: "invalidImport",
            data: {
              source: usedFolder,
              target: importSourceFile,
            },
          });
        }
      },
    };
  },
};
