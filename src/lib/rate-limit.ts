// Simple in-memory sliding window rate limiter for API routes.
// Tracks requests per IP within a time window.
// NOTE: This resets on server restart and is per-instance on Vercel (serverless).
// For stronger protection, use Redis or Upstash. This catches casual abuse.

const store = new Map<string, number[]>()

// Clean up old entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now

  const cutoff = now - windowMs
  store.forEach((timestamps, key) => {
    const valid = timestamps.filter((t) => t > cutoff)
    if (valid.length === 0) {
      store.delete(key)
    } else {
      store.set(key, valid)
    }
  })
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetIn: number // seconds until window resets
}

export function checkRateLimit(
  ip: string,
  endpoint: string,
  maxRequests: number,
  windowMs: number = 60 * 60 * 1000 // default: 1 hour
): RateLimitResult {
  cleanup(windowMs)

  const key = `${ip}:${endpoint}`
  const now = Date.now()
  const cutoff = now - windowMs

  const timestamps = (store.get(key) || []).filter((t) => t > cutoff)

  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0]
    const resetIn = Math.ceil((oldest + windowMs - now) / 1000)
    return { allowed: false, remaining: 0, resetIn }
  }

  timestamps.push(now)
  store.set(key, timestamps)

  return {
    allowed: true,
    remaining: maxRequests - timestamps.length,
    resetIn: Math.ceil(windowMs / 1000),
  }
}

// Preset limits for different endpoint types
export const RATE_LIMITS = {
  oath: { max: 5, window: 60 * 60 * 1000 },       // 5 per hour
  story: { max: 3, window: 60 * 60 * 1000 },       // 3 per hour
  contact: { max: 5, window: 60 * 60 * 1000 },     // 5 per hour
  newsletter: { max: 3, window: 60 * 60 * 1000 },   // 3 per hour
  ambassador: { max: 3, window: 60 * 60 * 1000 },   // 3 per hour
  upload: { max: 10, window: 60 * 60 * 1000 },      // 10 per hour
} as const
