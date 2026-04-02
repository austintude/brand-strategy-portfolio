/* eslint-disable @typescript-eslint/no-explicit-any */

interface PersonalProfile {
  resume?: string;
  portfolioUrls?: string[];
  linkedinUrl?: string;
  personalStatement?: string;
}

/**
 * Extracts text from DOCX using mammoth.js
 */
async function extractTextFromDocx(base64Data: string): Promise<string> {
  try {
    const mammoth = await import('mammoth');

    // Convert base64 data URL to ArrayBuffer
    const binaryString = atob(base64Data.split(',')[1] || base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const result = await mammoth.extractRawText({ arrayBuffer: bytes.buffer });
    return result.value || '';
  } catch (error) {
    console.error('Error extracting DOCX:', error);
    return '';
  }
}

/**
 * Builds profile context string from available data.
 * For PDF resumes, the raw base64 is preserved so the AI call in generate-strategy.ts
 * can send it as a document to the Claude API (which natively reads PDFs).
 * For DOCX resumes, we extract the text here.
 */
export async function extractProfileData(data: PersonalProfile): Promise<string> {
  let combinedText = '';

  // Process resume if provided
  if (data.resume) {
    try {
      const isPdf =
        data.resume.includes('application/pdf') ||
        data.resume.includes('data:application/pdf');
      const isDocx =
        data.resume.includes('application/vnd.openxmlformats-officedocument');

      if (isDocx) {
        const resumeText = await extractTextFromDocx(data.resume);
        if (resumeText) {
          combinedText += `## RESUME\n${resumeText}\n\n`;
        }
      } else if (isPdf) {
        // For PDFs, we'll pass the base64 data to the AI call directly
        // Mark it so generate-strategy.ts knows to use document content block
        combinedText += `## RESUME\n[PDF_BASE64:${data.resume}]\n\n`;
      } else {
        // Try DOCX extraction first
        const resumeText = await extractTextFromDocx(data.resume);
        if (resumeText) {
          combinedText += `## RESUME\n${resumeText}\n\n`;
        } else {
          // Fall back to sending as PDF
          combinedText += `## RESUME\n[PDF_BASE64:${data.resume}]\n\n`;
        }
      }
    } catch (error) {
      console.error('Error processing resume:', error);
    }
  }

  // Add portfolio URLs if provided
  if (data.portfolioUrls && data.portfolioUrls.length > 0) {
    const validUrls = data.portfolioUrls
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (validUrls.length > 0) {
      combinedText += `## PORTFOLIO LINKS\nThe strategist has portfolio work at these URLs (use your knowledge of these sites to inform the portfolio):\n${validUrls.map((url) => `- ${url}`).join('\n')}\n\n`;
    }
  }

  // Add LinkedIn URL if provided
  if (data.linkedinUrl && data.linkedinUrl.trim()) {
    combinedText += `## LINKEDIN PROFILE\nThe strategist's LinkedIn profile: ${data.linkedinUrl.trim()}\n\n`;
  }

  // Add personal brand statement if provided
  if (data.personalStatement && data.personalStatement.trim()) {
    combinedText += `## PERSONAL BRAND STATEMENT\n${data.personalStatement.trim()}\n\n`;
  }

  return combinedText;
}
