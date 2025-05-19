/**
 * Test script for the AI template selector. This is used for testing prompts
 * and responses from the AI assistant.
 */

import { loadEnvConfig } from "@next/env";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { Template } from "@/__generated__/graphql";

loadEnvConfig(process.cwd());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function formatTemplateForPrompt(template: Template): string {
  const description = template.description || "No description available";
  const languages = template.languages?.join(", ") || "No languages specified";
  const tags = template.tags?.join(", ") || "No tags specified";

  return `
Code: ${template.code}
Name: ${template.name}
Description: ${description}
Languages: ${languages}
Tags: ${tags}
Category: ${template.category || "Uncategorized"}
Health Score: ${template.health || "N/A"}
-------------------`;
}

async function getTemplateRecommendation(
  userRequest: string,
  templateData: string
): Promise<string> {
  const prompt = `
I want to build ${userRequest}. Recommend a template for me. Your response should be in the form:

templateCode: 123
reason: xyz

The reason should be a single short sentence. If there is no good template that matches return:

templateCode: null
reason: No template found.

Here are the top templates and some info about them:
${templateData}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that recommends the most suitable template based on the user's requirements. Consider the template's description, languages, tags, and category when making your recommendation. Always provide a clear reason for your recommendation.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "No recommendation available";
}

async function getRecommendation(userRequest: string, templateData: string) {
  console.log(`\nGetting recommendation for: "${userRequest}"`);
  console.log("===========================================");

  const recommendation = await getTemplateRecommendation(userRequest, templateData);
  console.log("\nRecommendation:");
  console.log(recommendation);
}

async function main() {
  try {
    // Read template data from file
    const templateDataPath = path.join(process.cwd(), "scripts", "templateData.json");
    const rawData = await fs.readFile(templateDataPath, "utf-8");
    const templates = JSON.parse(rawData) as Template[];

    const filteredTemplates = templates.filter((t) => {
      if (!t.health || t.health < 70) return false;
      if (t.description === null) return false;
      if (t.activeProjects === 0) return false;
      return true;
    });

    filteredTemplates.sort((a, b) => b.activeProjects - a.activeProjects);

    // Format and limit templates for prompt
    const formattedTemplates = filteredTemplates
      .slice(0, 100)
      .map(formatTemplateForPrompt)
      .join("\n");

    await getRecommendation("a messaging app", formattedTemplates);
    await getRecommendation("an AI knowledge base", formattedTemplates);
    await getRecommendation("I only know python", formattedTemplates);
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
