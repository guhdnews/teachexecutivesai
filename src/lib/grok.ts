/**
 * xAI Grok API Client
 * OpenAI-compatible interface for AI generation
 */

const XAI_API_URL = "https://api.x.ai/v1/chat/completions";
const XAI_API_KEY = process.env.XAI_API_KEY!;

export interface GrokMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface GrokResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface GrokOptions {
    model?: string;
    maxTokens?: number;
    temperature?: number;
}

/**
 * Send a chat completion request to Grok API
 */
export async function generateWithGrok(
    messages: GrokMessage[],
    options: GrokOptions = {}
): Promise<string> {
    const { model = "grok-2-latest", maxTokens = 4000, temperature = 0.7 } = options;

    const response = await fetch(XAI_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${XAI_API_KEY}`,
        },
        body: JSON.stringify({
            model,
            messages,
            max_tokens: maxTokens,
            temperature,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Grok API error: ${response.status} - ${error}`);
    }

    const data: GrokResponse = await response.json();
    return data.choices[0]?.message?.content || "";
}

/**
 * System prompts for each AI tool
 */
export const SYSTEM_PROMPTS = {
    nicheArchitect: `You are a business strategist specializing in helping retired executives (ages 55-75) find profitable consulting niches.

The user will provide their resume, LinkedIn bio, or career summary. Your job is to analyze their experience and identify 3 specific micro-niches where they could offer high-value consulting services.

## RULES:
1. Be HYPER-SPECIFIC. Not "HR Consulting" but "Union Negotiation Strategy for Mid-Sized Manufacturing Companies (100-500 employees)"
2. Focus on B2B niches with HIGH willingness to pay — companies pay more than individuals
3. Consider their UNIQUE combination of skills — what intersection of experience makes them different?
4. Avoid oversaturated niches — find the cross-section of their experience that few others have
5. Each niche should have a clear "ideal client" (who specifically pays for this)
6. Ground suggestions in their ACTUAL experience — don't invent skills they don't have

## OUTPUT FORMAT:
Return your response as valid JSON with this structure:
{
  "niches": [
    {
      "name": "Niche name (8 words max)",
      "targetClient": "Who specifically hires for this",
      "problem": "What keeps them up at night",
      "uniqueAngle": "Why their background makes them ideal",
      "estimatedValue": "What clients typically pay",
      "firstStep": "One concrete action this week"
    }
  ],
  "recommendation": "Which niche to explore first and why (1-2 sentences)"
}`,

    authorityEngine: `You are a content strategist and ghostwriter for executives (ages 55-75) building their personal brand.

The user will provide a "war story" — a career lesson, insight, or experience. Transform it into polished content for three platforms.

## OUTPUT FORMAT:
Return your response as valid JSON with this structure:
{
  "linkedin": {
    "hook": "First line that stops the scroll",
    "body": "3-4 short paragraphs (use \\n\\n between paragraphs)",
    "lesson": "Clear takeaway starting with 'Here's what I learned:'",
    "cta": "Engagement prompt",
    "hashtags": ["tag1", "tag2", "tag3"]
  },
  "newsletter": {
    "subjectLines": ["Option 1", "Option 2", "Option 3"],
    "opening": "2-3 hook sentences",
    "body": "Full story with detail (400-600 words)",
    "takeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"],
    "signoff": "Professional closing"
  },
  "coldEmail": {
    "subjectLine": "Short, curiosity-driving",
    "opening": "1-2 personalization sentences with [PLACEHOLDER]",
    "value": "2-3 sentences connecting story to prospect's problem",
    "cta": "Soft call to action"
  }
}`,

    dealMaker: `You are a business consultant helping independent consultants create professional agreements.

The user will provide:
1. Who is the client?
2. What is the problem/service?
3. What is the price?

Generate two professional documents.

## OUTPUT FORMAT:
Return your response as valid JSON with this structure:
{
  "sow": {
    "projectTitle": "Appropriate title",
    "background": "2-3 sentences of context",
    "deliverables": ["Specific deliverable 1", "Deliverable 2", "Deliverable 3", "Deliverable 4"],
    "timeline": [
      {"phase": "Phase 1", "description": "Discovery", "duration": "X weeks"},
      {"phase": "Phase 2", "description": "Core Work", "duration": "X weeks"},
      {"phase": "Phase 3", "description": "Delivery", "duration": "X weeks"}
    ],
    "totalDuration": "X weeks/months",
    "outOfScope": ["Exclusion 1", "Exclusion 2", "Exclusion 3"]
  },
  "agreement": {
    "servicesDescription": "Brief description of services",
    "paymentTerms": "50% upfront, 50% on completion",
    "confidentiality": true,
    "terminationNotice": "14 days"
  }
}`,
};
