import { GoogleGenAI } from "@google/genai"

const MAX_RESUME_CHARS = 15_000
const MAX_JD_CHARS = 8_000

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" }

  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  let body: { resumeText?: unknown; jobDescription?: unknown }
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body." }) }
  }

  const { resumeText, jobDescription } = body

  if (typeof resumeText !== "string" || typeof jobDescription !== "string") {
    return { statusCode: 400, body: JSON.stringify({ error: "resumeText and jobDescription are required strings." }) }
  }
  if (resumeText.trim().length === 0 || jobDescription.trim().length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "resumeText and jobDescription must not be empty." }) }
  }
  if (resumeText.length > MAX_RESUME_CHARS) {
    return { statusCode: 400, body: JSON.stringify({ error: `Resume text exceeds the ${MAX_RESUME_CHARS.toLocaleString()} character limit.` }) }
  }
  if (jobDescription.length > MAX_JD_CHARS) {
    return { statusCode: 400, body: JSON.stringify({ error: `Job description exceeds the ${MAX_JD_CHARS.toLocaleString()} character limit.` }) }
  }

  try {

    const result = await client.models.generateContent({
      model: "gemini-2.5-pro", 
      contents: `Analyze this resume against this JD: \nResume: ${resumeText} \nJD: ${jobDescription}`,
      config: {
        responseMimeType: "application/json",
        // In the new SDK, you can often pass the schema as a plain object
        responseSchema: {
          type: "OBJECT",
          properties: {
            score: { type: "NUMBER" },
            matchStatus: { type: "STRING" },
            summary: { type: "STRING" },
            missingKeywords: { type: "ARRAY", items: { type: "STRING" } },
            formattingIssues: { type: "ARRAY", items: { type: "STRING" } },
            improvements: { type: "ARRAY", items: { type: "STRING" } },
          },
          required: ["score", "matchStatus", "summary", "missingKeywords", "formattingIssues", "improvements"],
        },
      },
    })

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidates: result.candidates }),
    }
  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}