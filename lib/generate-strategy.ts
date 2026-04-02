/* eslint-disable @typescript-eslint/no-explicit-any */

const SYSTEM_PROMPT = `You are a world-class brand strategist with 20+ years of experience at top agencies (Wieden+Kennedy, Droga5, TBWA). You create deeply researched, insight-driven brand strategies that demonstrate senior-level strategic thinking.

Your output must be valid JSON matching the exact schema provided. No markdown, no code fences, no explanation -- just the JSON object.

CRITICAL RULES:
- Never use em dashes. Use double hyphens (--) instead.
- Every insight must be specific to the company, not generic.
- Reference real competitors, real market dynamics, real cultural trends.
- Metrics and targets should be realistic and grounded.
- Campaign concepts should be creative, unexpected, and strategically sound.
- The competitive map positions should reflect actual market positioning (x and y values 0-100).
- All text should read as if written by a senior strategist presenting to a CMO.`;

const buildUserPrompt = (companyName: string, industry: string) => `Create a comprehensive brand strategy for ${companyName} in the ${industry} industry.

Return a JSON object with this EXACT structure (no additional keys, no missing keys):

{
  "company": "${companyName}",
  "industry": "${industry}",
  "role": "Senior Brand Strategist",
  "positioning": {
    "canvas": {
      "targetAudience": "string -- specific demographic and psychographic description",
      "categoryFrame": "string -- how the brand frames its competitive category",
      "brandPromise": "string -- the core promise to consumers",
      "reasonsToBelieve": ["string", "string", "string"],
      "competitiveDifferentiator": "string -- what makes this brand uniquely positioned"
    },
    "competitiveMap": {
      "xAxis": "string -- left label -- right label (e.g., 'Product Focus -- Culture Focus')",
      "yAxis": "string -- bottom label -- top label (e.g., 'Mass Market -- Premium')",
      "positions": [
        { "name": "${companyName}", "x": 70, "y": 70 },
        { "name": "Competitor 1 Name", "x": 50, "y": 60 },
        { "name": "Competitor 2 Name", "x": 60, "y": 40 },
        { "name": "Competitor 3 Name", "x": 35, "y": 75 },
        { "name": "Competitor 4 Name", "x": 45, "y": 55 },
        { "name": "Competitor 5 Name", "x": 30, "y": 45 }
      ]
    },
    "recommendations": [
      {
        "number": 1,
        "title": "string -- strategic recommendation title",
        "detail": "string -- 2-3 sentences explaining the recommendation with specific reasoning"
      },
      {
        "number": 2,
        "title": "string",
        "detail": "string"
      },
      {
        "number": 3,
        "title": "string",
        "detail": "string"
      }
    ],
    "messagingHierarchy": {
      "brandPromise": "string -- the overarching brand message",
      "valuePropositions": ["string", "string", "string"],
      "proofPoints": ["string", "string", "string", "string"]
    }
  },
  "identity": {
    "audit": "string -- 3-4 sentences analyzing the current visual identity strengths and weaknesses",
    "moodBoard": ["string -- visual direction 1", "string -- visual direction 2", "string -- visual direction 3", "string -- visual direction 4"],
    "recommendations": ["string -- identity recommendation 1", "string -- recommendation 2", "string -- recommendation 3"]
  },
  "campaigns": [
    {
      "concept": "string -- campaign name",
      "insight": "string -- the human or market insight driving this campaign",
      "territory": "string -- the emotional/cultural territory being claimed",
      "headline": "string -- the campaign headline",
      "channels": ["string", "string", "string", "string"],
      "impact": "string -- projected impact with specific metrics"
    },
    {
      "concept": "string",
      "insight": "string",
      "territory": "string",
      "headline": "string",
      "channels": ["string", "string", "string", "string"],
      "impact": "string"
    },
    {
      "concept": "string",
      "insight": "string",
      "territory": "string",
      "headline": "string",
      "channels": ["string", "string", "string", "string"],
      "impact": "string"
    }
  ],
  "measurement": {
    "framework": "string -- 3-4 sentences describing the measurement approach",
    "kpis": [
      { "metric": "string", "target": "string", "why": "string" },
      { "metric": "string", "target": "string", "why": "string" },
      { "metric": "string", "target": "string", "why": "string" },
      { "metric": "string", "target": "string", "why": "string" },
      { "metric": "string", "target": "string", "why": "string" },
      { "metric": "string", "target": "string", "why": "string" }
    ],
    "tools": ["string -- tool 1 and its purpose", "string -- tool 2", "string -- tool 3", "string -- tool 4", "string -- tool 5"],
    "dashboardMockup": "string -- 3-4 sentences describing what the ideal brand health dashboard would show"
  }
}

IMPORTANT:
- Use REAL competitor names for ${companyName} in the competitive map -- not placeholders.
- All content must be specific to ${companyName} and the ${industry} industry.
- Campaign concepts should be bold and creative, not generic.
- Never use em dashes anywhere. Use double hyphens (--) instead.
- Return ONLY the JSON object. No other text.`;

export interface GenerationProgress {
  stage: string;
  detail: string;
  percent: number;
}

export async function generateStrategy(
  companyName: string,
  industry: string,
  apiKey: string,
  onProgress?: (progress: GenerationProgress) => void
): Promise<any> {
  onProgress?.({
    stage: 'Researching',
    detail: `Analyzing ${companyName} market position and competitive landscape...`,
    percent: 10,
  });

  // Small delay to show the first progress state
  await new Promise((r) => setTimeout(r, 800));

  onProgress?.({
    stage: 'Strategizing',
    detail: 'Developing positioning canvas and competitive mapping...',
    percent: 25,
  });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: buildUserPrompt(companyName, industry),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `API returned ${response.status}`;
      throw new Error(errorMessage);
    }

    onProgress?.({
      stage: 'Building',
      detail: 'Crafting campaign concepts and measurement framework...',
      percent: 60,
    });

    const data = await response.json();

    onProgress?.({
      stage: 'Assembling',
      detail: 'Compiling your personalized brand strategy...',
      percent: 85,
    });

    // Extract text content from the Claude response
    const textContent = data.content?.find((block: any) => block.type === 'text');
    if (!textContent?.text) {
      throw new Error('No text content in API response');
    }

    // Parse the JSON from the response (handle possible markdown fencing)
    let jsonText = textContent.text.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
    }

    const strategy = JSON.parse(jsonText);

    onProgress?.({
      stage: 'Complete',
      detail: 'Your brand strategy is ready.',
      percent: 100,
    });

    return strategy;
  } catch (error: any) {
    if (error.message?.includes('401') || error.message?.includes('authentication')) {
      throw new Error('Invalid API key. Please check your Anthropic API key and try again.');
    }
    if (error.message?.includes('429')) {
      throw new Error('Rate limited. Please wait a moment and try again.');
    }
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse strategy response. Please try again.');
    }
    throw error;
  }
}
