import { GoogleGenAI } from "@google/genai"
import { getStore } from "@netlify/blobs"

const MAX_RESUME_CHARS = 15_000
const MAX_JD_CHARS = 8_000
const WINDOW_MS = 60_000
const MAX_REQUESTS = 10

async function checkRateLimit(ip: string): Promise<boolean> {
  const store = getStore("rate-limit")
  const key = `ip:${ip}`
  const now = Date.now()

  const raw = await store.get(key, { type: "json" }) as { count: number; windowStart: number } | null
  let entry = raw ?? { count: 0, windowStart: now }

  if (now - entry.windowStart > WINDOW_MS) {
    entry = { count: 0, windowStart: now }
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) return false

  await store.setJSON(key, entry)
  return true
}

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" }

  const ip = event.headers["x-forwarded-for"] ?? event.headers["client-ip"] ?? "unknown"
  try {
    const allowed = await checkRateLimit(ip)
    if (!allowed) {
      return {
        statusCode: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "60" },
        body: JSON.stringify({ error: "Too many requests. Please wait before trying again." }),
      }
    }
  } catch {
    // Blobs not available in local dev — skip rate limiting
  }

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