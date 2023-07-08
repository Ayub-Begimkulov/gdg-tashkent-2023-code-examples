const path = require("path");

const allowedFolders = [
  "services",
  "utils",
  "components",
  "store",
  "pages",
  "types",
];
const allowedDependenciesMap = {
  utils: ["utils"],
  types: ["types"],
  services: ["utils", "types", "services"],
  store: ["utils", "types", "services", "store"],
  components: ["utils", "types", "services", "store", "components"],
  pages: ["pages", "utils", "types", "services", "store", "components"],
};

module.exports = {
  name: "no-wrong-import-2",
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
