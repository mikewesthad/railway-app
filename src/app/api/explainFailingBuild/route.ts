import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { logs } = await request.json();

    const prompt = `The following logs come from a Railway deployment build. The build has failed. Provide a one sentence description of what failed and what to do to fix it using Railway terminology

${logs}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
    });

    return NextResponse.json({
      explanation: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error analyzing logs:", error);
    return NextResponse.json({ error: "Failed to analyze logs" }, { status: 500 });
  }
}
