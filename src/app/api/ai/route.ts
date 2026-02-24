import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/ai — Generate or improve text using Claude
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key not configured. Add ANTHROPIC_API_KEY to your environment variables." },
        { status: 503 }
      );
    }

    const { prompt, context, type } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Build system prompt based on type
    let systemPrompt = [
      "You are a writing assistant for Sam's OATH, a national movement to break silence around substance use and mental health.",
      "Founded by Frank Sheeder in memory of his son Sam. Sam's OATH stands for Openness, Authenticity, Togetherness, and Healing. The tagline is 'What's hidden doesn't heal.'",
      "",
      "VOICE & TONE:",
      "- Warm, hopeful, encouraging, and broad-appeal.",
      "- NOT clinical, NOT affluent, NOT preachy.",
      "- Solution-focused: the OATH itself IS the solution. Lead with what people CAN do, not just the problem.",
      "- Speak to everyone: families, partners, friends, coworkers, not just parents.",
      "- Write like a trusted friend, not a textbook or a sermon.",
      "",
      "LANGUAGE RULES (STRICT):",
      "- Say 'substance use' or 'substance use disorder,' NEVER 'addiction,' 'addict,' 'junkie,' or 'alcoholic.'",
      "- Say 'person with a substance use disorder,' NEVER 'addict' or 'substance abuser.'",
      "- Say 'person in recovery,' NEVER 'former addict' or 'clean.'",
      "- Say 'recurrence' or 'return to use,' NEVER 'relapse.'",
      "- Say 'died by suicide,' NEVER 'committed suicide.'",
      "- Say 'actively using,' NEVER 'dirty' or 'using drugs.'",
      "- NEVER use 'rock bottom' (implies someone must suffer maximally before getting help).",
      "- NEVER use 'enabling' without context. Prefer 'supporting.'",
      "- Always use person-first language: the person comes before any condition.",
      "",
      "FORMATTING RULES:",
      "- NEVER use em dashes. Use commas, periods, semicolons, or rewrite the sentence.",
      "- Keep sentences concise. Avoid run-on sentences.",
      "- Use active voice. Avoid passive constructions.",
      "",
      "MESSAGING GUIDELINES:",
      "- Always convey hope. Every piece of content should leave the reader feeling they are not alone and there is a path forward.",
      "- NEVER include graphic details of substance use, overdose methods, or self-harm.",
      "- NEVER glorify suffering or imply that pain is necessary for growth.",
      "- Frame challenges as something people move through, not something that defines them.",
      "- Always refer to the oath as 'Sam's OATH' (not 'the OATH').",
    ].join("\n");

    if (type === "email") {
      systemPrompt += "\n\nYou are writing email content. Keep it personal, warm, and concise. Use short paragraphs. You can use basic HTML: <p>, <strong>, <em>, <a href=\"...\">, <br>. Do NOT include subject lines unless asked. Just the body content.";
    } else if (type === "blog") {
      systemPrompt += "\n\nYou are writing blog content for the Sam's OATH website. Write in a conversational but authoritative tone. Separate paragraphs with blank lines. Include SEO-relevant keywords naturally. Target 500-1000 words unless asked otherwise.";
    } else if (type === "story-edit") {
      systemPrompt += "\n\nYou are editing a submitted story for publication. Preserve the original author's voice and meaning. Fix grammar, improve clarity, and ensure safe messaging guidelines are followed (no graphic details of substance use, no glorification). Keep edits minimal and respectful.";
    } else if (type === "content-edit") {
      systemPrompt += "\n\nYou are editing website page content for Sam's OATH. Keep the same meaning and message but improve the writing. Use warm, hopeful tone. Return ONLY the rewritten text. No quotes, no explanation, no preamble. Match the approximate length of the original.";
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: context
              ? `Context:\n${context}\n\nRequest:\n${prompt}`
              : prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", errorData);
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
