import { NextResponse } from "next/server";
import OpenAI from "openai";
import { templateData } from "./templateData";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function formatTemplateForPrompt(template: (typeof templateData)[number]): string {
  const description = template.description || "No description available";
  const languages = template.languages?.join(", ") || "No languages specified";
  const tags = template.tags?.join(", ") || "No tags specified";

  return `
Template ID: ${template.id}
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

templateId: 123
reason: xyz

The reason should be a single short sentence. If there is no good template that matches return:

templateId: null
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

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const filteredTemplates = templateData.filter((t) => {
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

    const recommendation = await getTemplateRecommendation(prompt, formattedTemplates);

    // Parse the recommendation to extract templateId and reason
    const templateIdMatch = recommendation.match(/templateId:\s*(\S+)/);
    const reasonMatch = recommendation.match(/reason:\s*(.+)/);

    return NextResponse.json({
      templateId: templateIdMatch ? templateIdMatch[1] : null,
      reason: reasonMatch ? reasonMatch[1].trim() : "No reason provided",
    });
  } catch (error) {
    console.error("Error getting template recommendation:", error);
    return NextResponse.json({ error: "Failed to get template recommendation" }, { status: 500 });
  }
}
