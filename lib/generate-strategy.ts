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

const buildUserPrompt = (companyName: string, industry: string, profileContext?: string) => {
  let prompt = `Create a comprehensive brand strategy for ${companyName} in the ${industry} industry.

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

  if (profileContext) {
    prompt += `\n\nCONTEXT ABOUT THE STRATEGIST:\n${profileContext}`;
  }

  return prompt;
};

const buildPortfolioPrompt = (profileContext: string) => `Based on the strategist profile below, create a personalized portfolio of case studies showcasing their real brand strategy work.

PROFILE:
${profileContext}

Return a JSON object with this EXACT structure:

{
  "positioning": [
    {
      "title": "string -- case study title",
      "client": "string -- actual company/client name",
      "industry": "string -- industry vertical",
      "challenge": "string -- 2-3 sentences describing the business challenge",
      "approach": "string -- 2-3 sentences describing the strategic approach",
      "outcome": "string -- 2-3 sentences describing the results and impact",
      "metrics": "string -- specific, measurable outcomes (e.g., '+23% brand preference, +41% revenue, 3x earned media')"
    },
    {
      "title": "string",
      "client": "string",
      "industry": "string",
      "challenge": "string",
      "approach": "string",
      "outcome": "string",
      "metrics": "string"
    },
    {
      "title": "string",
      "client": "string",
      "industry": "string",
      "challenge": "string",
      "approach": "string",
      "outcome": "string",
      "metrics": "string"
    }
  ],
  "identity": [
    {
      "title": "string -- case study title",
      "client": "string -- actual company/client name",
      "industry": "string -- industry vertical",
      "challenge": "string -- 2-3 sentences describing the branding challenge",
      "approach": "string -- 2-3 sentences describing the approach",
      "outcome": "string -- 2-3 sentences describing results",
      "metrics": "string -- specific outcomes"
    },
    {
      "title": "string",
      "client": "string",
      "industry": "string",
      "challenge": "string",
      "approach": "string",
      "outcome": "string",
      "metrics": "string"
    }
  ],
  "campaigns": [
    {
      "title": "string -- campaign case study title",
      "client": "string -- actual company/client name",
      "industry": "string -- industry vertical",
      "challenge": "string -- 2-3 sentences describing the marketing challenge",
      "approach": "string -- 2-3 sentences describing the campaign strategy",
      "outcome": "string -- 2-3 sentences describing the results",
      "metrics": "string -- specific campaign metrics and KPIs"
    },
    {
      "title": "string",
      "client": "string",
      "industry": "string",
      "challenge": "string",
      "approach": "string",
      "outcome": "string",
      "metrics": "string"
    },
    {
      "title": "string",
      "client": "string",
      "industry": "string",
      "challenge": "string",
      "approach": "string",
      "outcome": "string",
      "metrics": "string"
    }
  ],
  "measurement": [
    {
      "title": "string -- measurement/analytics case study title",
      "client": "string -- actual company/client name",
      "industry": "string -- industry vertical",
      "challenge": "string -- 2-3 sentences describing the measurement challenge",
      "approach": "string -- 2-3 sentences describing the measurement approach",
      "outcome": "string -- 2-3 sentences describing the impact",
      "metrics": "string -- specific measurement results and ROI"
    },
    {
      "title": "string",
      "client": "string",
      "industry": "string",
      "challenge": "string",
      "approach": "string",
      "outcome": "string",
      "metrics": "string"
    }
  ]
}

CRITICAL RULES:
- Create case studies based on the strategist's REAL work experience from their resume/portfolio
- Use actual company/client names from their background
- Include realistic metrics and measurable outcomes
- Structure each case study with clear challenge/approach/outcome flow
- Make titles compelling and specific to the work shown
- Never use em dashes -- use double hyphens (--) instead
- Return ONLY the JSON object, no other text`;

/**
 * Builds the content array for a Claude API message.
 * If profileContext contains a [PDF_BASE64:...] marker, extracts it
 * and sends it as a document content block so Claude can read the PDF natively.
 */
function buildMessageContent(textPrompt: string, profileContext?: string): any[] {
  const content: any[] = [];

  // Check if profile context contains an embedded PDF
  if (profileContext) {
    const pdfMatch = profileContext.match(/\[PDF_BASE64:(data:application\/pdf;base64,([^\]]+))\]/);
    if (pdfMatch) {
      const base64Data = pdfMatch[2]; // just the base64 part without the data URL prefix
      // Add PDF as a document content block
      content.push({
        type: 'document',
        source: {
          type: 'base64',
          media_type: 'application/pdf',
          data: base64Data,
        },
      });
      // Remove the PDF marker from text context so it doesn't bloat the prompt
      profileContext = profileContext.replace(/\[PDF_BASE64:[^\]]+\]/, '[Resume PDF attached above]');
    }
  }

  content.push({ type: 'text', text: textPrompt });
  return content;
}

export interface GenerationProgress {
  stage: string;
  detail: string;
  percent: number;
}

export interface GenerationResult {
  portfolio?: any;
  strategy: any;
}

export async function generateStrategy(
  companyName: string,
  industry: string,
  apiKey: string,
  profileContext?: string,
  onProgress?: (progress: GenerationProgress) => void
): Promise<GenerationResult> {
  onProgress?.({
    stage: 'Researching',
    detail: `Analyzing ${companyName} market position and competitive landscape...`,
    percent: 10,
  });

  // Small delay to show the first progress state
  await new Promise((r) => setTimeout(r, 800));

  // If profile data is provided, generate portfolio first
  let portfolio = null;
  if (profileContext) {
    onProgress?.({
      stage: 'Building Portfolio',
      detail: 'Extracting case studies from your experience...',
      percent: 15,
    });

    try {
      const portfolioResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 6000,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: buildMessageContent(buildPortfolioPrompt(profileContext), profileContext),
            },
          ],
        }),
      });

      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json();
        const portfolioTextContent = portfolioData.content?.find((block: any) => block.type === 'text');
        if (portfolioTextContent?.text) {
          let portfolioJsonText = portfolioTextContent.text.trim();
          if (portfolioJsonText.startsWith('```')) {
            portfolioJsonText = portfolioJsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
          }
          portfolio = JSON.parse(portfolioJsonText);
        }
      }
    } catch (error) {
      console.error('Error generating portfolio:', error);
      // Continue even if portfolio generation fails
    }
  }

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
            content: profileContext
              ? buildMessageContent(buildUserPrompt(companyName, industry, profileContext), profileContext)
              : buildUserPrompt(companyName, industry),
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

    return portfolio ? { portfolio, strategy } : { strategy };
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
