import { randomUUID } from 'node:crypto'
import type { CollectionAfterChangeHook } from 'payload'

import type { FormSubmission } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const DEFAULT_HOMESERVER = 'https://matrix-client.matrix.org'
const MAX_VALUE_LENGTH = 4_000
// Matrix rejects events over 64 KiB; stay well below it.
const MAX_BODY_LENGTH = 30_000
const TIMEOUT_MS = 5_000

const getMatrixConfig = () => {
  const accessToken = process.env.MATRIX_ACCESS_TOKEN
  const roomId = process.env.MATRIX_ROOM_ID
  if (!accessToken || !roomId) return null

  const homeserver = (process.env.MATRIX_HOMESERVER_URL || DEFAULT_HOMESERVER).replace(/\/+$/, '')
  return { accessToken, homeserver, roomId }
}

const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max)}…` : value

// Prefix every line of visitor input so it can't pose as part of the message frame
// (e.g. a forged admin link or "email:" line).
const quote = (value: string) =>
  truncate(value, MAX_VALUE_LENGTH)
    .split(/\r\n|\r|\n/)
    .map((line) => `> ${line}`)
    .join('\n')

/**
 * Posts a plain-text notice of each new form submission to a Matrix room.
 * Disabled unless MATRIX_ACCESS_TOKEN and MATRIX_ROOM_ID are set. Failures are
 * logged and never fail the submission itself.
 */
export const notifyMatrixOnFormSubmission: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const config = getMatrixConfig()
  if (!config) return doc

  try {
    let formTitle = ''
    if (typeof doc.form === 'object' && doc.form) {
      formTitle = doc.form.title
    } else if (doc.form) {
      const form = await req.payload.findByID({
        collection: 'forms',
        id: doc.form,
        depth: 0,
        req,
      })
      formTitle = form.title
    }

    const site = process.env.HOSTNAME || process.env.WEBSITE_NAME || getServerSideURL()
    const fields = (doc.submissionData ?? []).map(
      ({ field, value }) => `${field.replace(/\s+/g, ' ')}:\n${quote(String(value ?? ''))}`,
    )
    const adminUrl = `${getServerSideURL()}${req.payload.config.routes.admin}/collections/form-submissions/${doc.id}`

    // Plain `body` only (no `formatted_body`), so submitted content can't inject HTML.
    const body = truncate(
      [
        `New form submission on ${site}${formTitle ? ` (${formTitle})` : ''}`,
        `Open in admin: ${adminUrl}`,
        '',
        fields.join('\n\n'),
      ].join('\n'),
      MAX_BODY_LENGTH,
    )

    const url = `${config.homeserver}/_matrix/client/v3/rooms/${encodeURIComponent(
      config.roomId,
    )}/send/m.room.message/${randomUUID()}`

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      // An empty m.mentions disables body-based mention rules, so visitor text can't ping
      // anyone (e.g. "@room" or a user ID).
      body: JSON.stringify({ msgtype: 'm.text', body, 'm.mentions': {} }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (!res.ok) {
      req.payload.logger.error(
        `Matrix notification failed (${res.status}): ${await res.text().catch(() => '')}`,
      )
    }
  } catch (err) {
    req.payload.logger.error({ err }, 'Matrix notification failed')
  }

  return doc
}
