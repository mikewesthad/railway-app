import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

if (!process.env.RAILWAY_API_KEY) {
  throw new Error("RAILWAY_API_KEY is not set");
}

const schema =
  process.env.LIVE_SCHEMA === "true"
    ? {
        "https://backboard.railway.com/graphql/v2": {
          headers: {
            Authorization: process.env.RAILWAY_API_KEY,
          },
        },
      }
    : "./codegen/schema.graphql";

const config: CodegenConfig = {
  schema,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./codegen/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
