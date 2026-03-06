import type { Config, Context } from '@netlify/edge-functions'
import { getStore } from 'npm:@netlify/blobs'

const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 10

export default async function handler(request: Request, context: Context) {
  const ip = context.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  const store = getStore('rate-limit')
  const key = `ip:${ip}`
  const now = Date.now()

  const raw = await store.get(key, { type: 'json' }) as { count: number; windowStart: number } | null
  let entry = raw ?? { count: 0, windowStart: now }

  if (now - entry.windowStart > WINDOW_MS) {
    entry = { count: 0, windowStart: now }
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait before trying again.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    )
  }

  await store.setJSON(key, entry, { ttl: Math.ceil(WINDOW_MS / 1000) })

  return context.next()
}

export const config: Config = {
  path: '/.netlify/functions/analyze',
}
