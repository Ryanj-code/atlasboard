import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/src/graphql/generated/schema.graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        enumsAsTypes: true, // Converts GraphQL enums into union string types
      },
    },
  },
};

export default config;
