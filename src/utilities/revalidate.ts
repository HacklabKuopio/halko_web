import type { CollectionSlug, Payload } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import localization from '@/i18n/localization'
import { collectionPrefixMap } from '@/utilities/generatePreviewPath'

const LOCALES = localization.locales.map((locale) => locale.code)

/**
 * Immediate expiry, so the editor sees the change on their *next* request.
 *
 * Do not use `'max'` here: it only marks the entry stale, which means the first
 * refresh after publishing still serves the old page and the fresh render happens
 * in the background. That is the wrong trade-off for a CMS publish.
 */
const EXPIRE_NOW = { expire: 0 } as const

/**
 * Also fire `revalidatePath('/', 'layout')` on every content change.
 *
 * Every prerendered entry carries the `_N_T_/layout` soft tag, so this is the only
 * invalidation that is independent of route groups, locales and slugs. It is what
 * catches content we cannot compute a tag for: a replaced Media file, a renamed
 * Category, or anything else pulled in through relationship population inside the
 * uncached page query (which cannot be cached without breaking live preview).
 *
 * Pages re-render lazily on next visit, so the cost is one query per page actually
 * requested. Flip to `false` only if that ever becomes measurable — the precise
 * paths and tags below keep working on their own.
 */
const SITE_WIDE = true

const pathsFor = (collection: string, slug?: string | null): string[] => {
  const prefix = collectionPrefixMap[collection as CollectionSlug]

  // Collections without a route of their own (media, categories, sponsors, events…)
  // rely on tags plus the site-wide purge.
  if (prefix === undefined || !slug) return []

  if (collection === 'pages' && slug === 'home') return LOCALES.map((locale) => `/${locale}`)

  return LOCALES.map((locale) => `/${locale}${prefix}/${slug}`)
}

/**
 * `revalidatePath`/`revalidateTag` throw when there is no Next request scope
 * (E263 "static generation store missing") — for example when a document is written
 * from a seed script, a migration or a job running outside a route handler. A cache
 * concern must never fail the database write that triggered it.
 */
const swallowOutsideRequestScope = (payload: Payload | undefined, label: string, err: unknown) => {
  payload?.logger.warn({ err }, `[revalidate] skipped ${label} — no Next request scope`)
}

type RevalidateContentArgs = {
  collection: string
  id?: string | number
  slug?: string | null
  previousSlug?: string | null
  payload?: Payload
  reason?: string
}

export const revalidateContent = ({
  collection,
  id,
  slug,
  previousSlug,
  payload,
  reason = 'change',
}: RevalidateContentArgs): void => {
  // A renamed slug leaves the old URL cached forever unless we invalidate it too.
  const staleSlug = previousSlug && previousSlug !== slug ? previousSlug : null

  const paths = [...pathsFor(collection, slug), ...pathsFor(collection, staleSlug)]

  const tags = [
    'content',
    collection,
    ...(id != null ? [`${collection}_${id}`] : []),
    ...(slug ? [`${collection}_${slug}`] : []),
    ...(staleSlug ? [`${collection}_${staleSlug}`] : []),
    ...(collection === 'pages' ? ['pages-sitemap'] : []),
    ...(collection === 'posts' ? ['posts-sitemap'] : []),
  ]

  try {
    for (const path of paths) revalidatePath(path)
    for (const tag of tags) revalidateTag(tag, EXPIRE_NOW)
    if (SITE_WIDE) revalidatePath('/', 'layout')

    payload?.logger.info(
      `[revalidate] ${collection}#${id ?? '-'} (${reason}) paths=[${paths.join(',')}] tags=[${tags.join(',')}] siteWide=${SITE_WIDE}`,
    )
  } catch (err) {
    swallowOutsideRequestScope(payload, `${collection}#${id ?? '-'}`, err)
  }
}

export const revalidateGlobalContent = (slug: string, payload?: Payload): void => {
  try {
    revalidateTag(`global_${slug}`, EXPIRE_NOW)
    for (const locale of LOCALES) revalidateTag(`global_${slug}_${locale}`, EXPIRE_NOW)
    revalidateTag('content', EXPIRE_NOW)
    if (SITE_WIDE) revalidatePath('/', 'layout')

    payload?.logger.info(`[revalidate] global_${slug} siteWide=${SITE_WIDE}`)
  } catch (err) {
    swallowOutsideRequestScope(payload, `global_${slug}`, err)
  }
}
