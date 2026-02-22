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
    let systemPrompt = "You are a writing assistant for Sam's OATH, a national movement to break silence around substance use and mental health. The tone should be warm, hopeful, and broad-appeal — NOT clinical, NOT affluent. Use solution-focused language. The OATH stands for Openness, Authenticity, Togetherness, and Healing. The tagline is 'What's hidden doesn't heal.' Founded by Frank Sheeder in memory of his son Sam.";

    if (type === "email") {
      systemPrompt += "\n\nYou are writing email content. Keep it personal, warm, and concise. Use short paragraphs. You can use basic HTML: <p>, <strong>, <em>, <a href=\"...\">, <br>. Do NOT include subject lines unless asked — just the body content.";
    } else if (type === "blog") {
      systemPrompt += "\n\nYou are writing blog content for the Sam's OATH website. Write in a conversational but authoritative tone. Separate paragraphs with blank lines. Include SEO-relevant keywords naturally. Target 500-1000 words unless asked otherwise.";
    } else if (type === "story-edit") {
      systemPrompt += "\n\nYou are editing a submitted story for publication. Preserve the original author's voice and meaning. Fix grammar, improve clarity, and ensure safe messaging guidelines are followed (no graphic details of substance use, no glorification). Keep edits minimal and respectful.";
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
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
