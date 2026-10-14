// proxy.ts
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const FORM_SUBMISSIONS_PATH = '/api/form-submissions'
// A legitimate submission is a few KB; reject anything larger before Payload parses it.
const MAX_FORM_SUBMISSION_BYTES = 64 * 1024

const rejectInvalidSubmission = (request: NextRequest) => {
  if (request.method !== 'POST') return null

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ errors: [{ message: 'Expected JSON.' }] }, { status: 415 })
  }
  const length = Number(request.headers.get('content-length'))
  if (!Number.isFinite(length) || length <= 0) {
    return NextResponse.json({ errors: [{ message: 'Content-Length required.' }] }, { status: 411 })
  }
  if (length > MAX_FORM_SUBMISSION_BYTES) {
    return NextResponse.json({ errors: [{ message: 'Submission too large.' }] }, { status: 413 })
  }
  return null
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === FORM_SUBMISSIONS_PATH) {
    return rejectInvalidSubmission(request) ?? NextResponse.next()
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, or `/admin`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|hallintapaneeli-d064b4f4|next|.*\\..*).*)',
    '/api/form-submissions',
  ],
}
