import { QueryTemplatesConnection } from "@/__generated__/graphql";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { loadEnvConfig } from "@next/env";
import fs from "fs/promises";
import path from "path";
import removeMd from "remove-markdown";

// Load environment variables
loadEnvConfig(process.cwd());

const TEMPLATES_QUERY = gql`
  query Templates {
    templates {
      edges {
        node {
          id
          isApproved
          activeProjects
          projects
          description
          readme
          name
          category
          health
          code
          languages
          tags
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "https://backboard.railway.app/graphql/v2",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
  },
});

function convertToPlaintext(markdown: string): string {
  return removeMd(markdown);
}

async function main() {
  try {
    console.log("Fetching templates...");
    const { data } = await client.query({
      query: TEMPLATES_QUERY,
    });

    console.log(`Found ${data.templates.edges.length} templates total.`);

    const templates = (data.templates as QueryTemplatesConnection).edges.map((edge) => ({
      ...edge.node,
      // Convert readmes to plaintext for better parsing.
      readme: edge.node.readme ? convertToPlaintext(edge.node.readme) : null,
    }));

    // Save raw template data.
    const outputPath = path.join(process.cwd(), "scripts", "templateData.json");
    await fs.writeFile(outputPath, JSON.stringify(templates, null, 2), "utf-8");

    console.log(`\nTemplate data saved to: ${outputPath}`);
    console.log(`Total templates: ${templates.length}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
