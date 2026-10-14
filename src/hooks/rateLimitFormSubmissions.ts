import { APIError, type CollectionBeforeOperationHook, type PayloadRequest } from 'payload'

const MINUTE = 60 * 1000

// A real visitor sends a message or two; anything beyond this is a script.
const LIMITS = [
  { windowMs: 10 * MINUTE, max: 3 },
  { windowMs: 24 * 60 * MINUTE, max: 10 },
]
// Across all clients, so rotating IPs can't flood the notification inboxes.
const GLOBAL_LIMIT = { windowMs: 10 * MINUTE, max: 30 }
const LONGEST_WINDOW_MS = Math.max(...LIMITS.map(({ windowMs }) => windowMs))

const perIp = new Map<string, number[]>()
let globalHits: number[] = []

const countSince = (timestamps: number[], since: number) =>
  timestamps.filter((timestamp) => timestamp > since).length

/**
 * Traffic arrives through Cloudflare and then the reverse proxy, so CF-Connecting-IP holds the
 * visitor's address (X-Forwarded-For's right-most entry would be a Cloudflare edge). It is only
 * trustworthy while the origin accepts connections from Cloudflare alone.
 */
const getClientIp = (req: PayloadRequest) =>
  req.headers.get('cf-connecting-ip')?.trim() ||
  req.headers.get('x-forwarded-for')?.split(',').pop()?.trim() ||
  req.headers.get('x-real-ip') ||
  'unknown'

/**
 * In-memory limiter for public form submissions. State is per server process, which matches
 * the single-instance deployment; use a shared store if the app is ever scaled out. Cloudflare
 * WAF limits apply on top of this.
 */
export const rateLimitFormSubmissions: CollectionBeforeOperationHook = ({ operation, req }) => {
  if (operation !== 'create' || req.user) return

  const now = Date.now()
  const ip = getClientIp(req)
  const ipHits = (perIp.get(ip) ?? []).filter((timestamp) => now - timestamp < LONGEST_WINDOW_MS)
  globalHits = globalHits.filter((timestamp) => now - timestamp < GLOBAL_LIMIT.windowMs)

  const limited =
    LIMITS.some(({ windowMs, max }) => countSince(ipHits, now - windowMs) >= max) ||
    globalHits.length >= GLOBAL_LIMIT.max

  if (limited) {
    req.payload.logger.warn(`Form submission rate limit hit for ${ip}`)
    throw new APIError('Too many submissions. Please try again later.', 429, null, true)
  }

  ipHits.push(now)
  globalHits.push(now)
  perIp.set(ip, ipHits)

  // Keep the map from growing without bound.
  if (perIp.size > 10_000) {
    for (const [key, hits] of perIp) {
      if (!hits.some((timestamp) => now - timestamp < LONGEST_WINDOW_MS)) perIp.delete(key)
    }
  }
}
