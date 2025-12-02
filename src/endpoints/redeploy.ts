// filepath: c:\Users\jespe\WebstormProjects\halko_web\src\endpoints\redeploy.ts
import type { Endpoint, PayloadHandler, PayloadRequest } from 'payload'

const REDEPLOY_URL = process.env.REDEPLOY_URL
const REDEPLOY_TOKEN = process.env.REDEPLOY_TOKEN

interface RedeployBody {
  reason?: string
  timeoutMs?: number
}

// Helper to build JSON fetch Responses (instead of Response.json which may be undefined)
const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const redeployHandler: PayloadHandler = async (req: PayloadRequest): Promise<Response> => {
  // ---- Auth guard ----
  if (!req.user) {
    return json(401, { message: 'Unauthorized: login required.' })
  }

  // ---- Validate server config ----
  if (!REDEPLOY_URL || !REDEPLOY_TOKEN) {
    return json(500, {
      message: 'Redeploy URL or token not configured on server.',
      configured: {
        url: Boolean(REDEPLOY_URL),
        token: Boolean(REDEPLOY_TOKEN),
      },
    })
  }

  // ---- Parse request body (Express-style via req.body) ----
  // Payload's Endpoint handlers receive an Express Request; req.json() is not available.
  // Body is already parsed (if JSON) into req.body by middleware.
  let body: RedeployBody = {}
  const rawBody = (req as any).body // typed as unknown/any on PayloadRequest
  if (rawBody && typeof rawBody === 'object') {
    body = rawBody as RedeployBody
  }
  // Optional: allow reason via query param as fallback
  if (!body.reason && typeof req.query?.reason === 'string') {
    body.reason = req.query.reason
  }

  const { reason, timeoutMs } = body
  const effectiveTimeout =
    typeof timeoutMs === 'number' && timeoutMs > 0 ? timeoutMs : 10_000

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), effectiveTimeout)

  try {
    req.payload.logger.info(
      `Redeploy requested by user ${req.user.id}${
        reason ? ` (reason: ${reason})` : ''
      }`,
    )

    const response = await fetch(REDEPLOY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REDEPLOY_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
      body: JSON.stringify({
        reason: reason || 'manual-trigger',
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    const text = await response.text().catch(() => '')
    let parsed: unknown = text

    try {
      parsed = text ? JSON.parse(text) : undefined
    } catch {
      // ignore JSON parse errors, fall back to raw text
    }

    if (!response.ok) {
      req.payload.logger.error(
        { status: response.status, body: text },
        'Redeploy request failed',
      )

      return json(502, {
        message: 'Redeploy request failed.',
        status: response.status,
        body: parsed ?? text,
      })
    }

    return json(200, {
      message: 'Redeploy triggered successfully.',
      status: response.status,
      body: parsed ?? text,
      reason: reason || 'manual-trigger',
    })
  } catch (err) {
    clearTimeout(timeout)

    const error = err as Error
    const aborted = error?.name === 'AbortError'

    req.payload.logger.error(error, 'Error triggering redeploy')

    return json(500, {
      message: aborted
        ? 'Redeploy request timed out.'
        : 'Error triggering redeploy.',
      error: error.message ?? String(error),
      aborted,
    })
  }
}

export const redeployEndpoint: Endpoint = {
  path: '/admin/redeploy',
  method: 'post',
  handler: redeployHandler,
}
