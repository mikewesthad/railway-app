import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * This is a proof-of-concept for AI debugging of logs. The idea is to use the
 * OpenAI API to analyze the logs and provide a one-sentence summary of what
 * failed and what to do to fix it using Railway terminology. This likely can be
 * improved by feeding Railway docs into the model.
 */
export async function POST(request: Request) {
  try {
    // TODO: ideally this wouldn't require the client to send the logs to the
    // server. I imagine the AI summary could be generated in a job after a
    // build fails.
    const { logs } = await request.json();
    if (!logs) {
      return NextResponse.json({ error: "No logs provided" }, { status: 400 });
    }

    if (logs.length > 3000) {
      return NextResponse.json({ error: "Logs are too long" }, { status: 400 });
    }

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
