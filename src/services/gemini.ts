export interface ATSAnalysis {
  score: number;
  matchStatus: "Low" | "Medium" | "High";
  summary: string;
  missingKeywords: string[];
  formattingIssues: string[];
  improvements: string[];
}

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<ATSAnalysis> {
  try {
    const response = await fetch('/.netlify/functions/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription }),
    });

    const result = await response.json();

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("The AI didn't return any text. Check safety filters or prompt.");
    }

    return JSON.parse(rawText) as ATSAnalysis;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
}