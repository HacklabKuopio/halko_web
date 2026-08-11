import type { Event, Post, Sponsor } from '@/payload-types'
import type { TypedLocale, Where } from 'payload'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

/**
 * Cached reads for content that is embedded in other pages.
 *
 * Two things are going on here, and both are load-bearing:
 *
 * 1. **Tags.** An uncached `payload.find` inside a server component contributes no
 *    cache tags to the page that renders it, so no `revalidateTag` can ever reach it
 *    — `.next/server/app/en/events.meta` carried no `events` tag before this. Tagging
 *    the read wires these pages into the revalidation hooks in `@/plugins/revalidation`.
 *
 * 2. **`revalidate`.** These queries filter on `new Date()`. On a page prerendered with
 *    `revalidate: false` that comparison is frozen at build time forever, so an event
 *    never moves from "upcoming" to "past" on its own. A numeric `revalidate` on the
 *    `unstable_cache` options propagates up to the enclosing page's cache entry and
 *    turns it into a proper ISR page. A day-bucketed cache key would not work: it only
 *    changes the inner key, while the outer HTML is still never re-rendered.
 */

const EVENTS_TTL = 900 // 15 min — bounds how stale the upcoming/past split can be
const SPONSORS_TTL = 3600 // 1 h — sponsor start/end dates are day-granular

const getPayloadClient = () => getPayload({ config: configPromise })

/** Live preview must always read through to the database. */
const isDraft = async (): Promise<boolean> => {
  const { isEnabled } = await draftMode()
  return isEnabled
}

// ---------------------------------------------------------------- events

const fetchEventsSplit = async (locale: TypedLocale) => {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const [upcomingResult, pastResult] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { date: { greater_than_equal: now } },
      sort: 'date',
      limit: 100,
      locale,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'events',
      where: { date: { less_than: now } },
      sort: '-date',
      limit: 100,
      locale,
      overrideAccess: false,
    }),
  ])

  return { upcoming: upcomingResult.docs, past: pastResult.docs }
}

export const getEventsSplit = async (
  locale: TypedLocale,
): Promise<{ upcoming: Event[]; past: Event[] }> => {
  if (await isDraft()) return fetchEventsSplit(locale)

  return unstable_cache(fetchEventsSplit, ['events-split'], {
    tags: ['content', 'events'],
    revalidate: EVENTS_TTL,
  })(locale)
}

const fetchNextEvent = async (locale: TypedLocale): Promise<Event | null> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'events',
    where: { date: { greater_than_equal: new Date().toISOString() } },
    sort: 'date',
    limit: 1,
    locale,
    overrideAccess: false,
  })

  return result.docs?.[0] ?? null
}

export const getNextEvent = async (locale: TypedLocale): Promise<Event | null> => {
  if (await isDraft()) return fetchNextEvent(locale)

  return unstable_cache(fetchNextEvent, ['events-next'], {
    tags: ['content', 'events'],
    revalidate: EVENTS_TTL,
  })(locale)
}

const fetchEventById = async (id: number, locale: TypedLocale): Promise<Event | null> => {
  const payload = await getPayloadClient()

  const result = await payload.findByID({
    collection: 'events',
    id,
    locale,
    overrideAccess: false,
  })

  return result ?? null
}

export const getEventById = async (id: number, locale: TypedLocale): Promise<Event | null> => {
  if (await isDraft()) return fetchEventById(id, locale)

  // No time window, so tags alone are enough — no time-based revalidate needed.
  return unstable_cache(fetchEventById, ['events-by-id'], {
    tags: ['content', 'events', `events_${id}`],
  })(id, locale)
}

// -------------------------------------------------------------- sponsors

export type SponsorQuery = {
  tiers?: string[] | null
  onlyFeatured?: boolean | null
  onlyCurrentlyActive?: boolean | null
  limit: number
}

const fetchSponsors = async (query: SponsorQuery): Promise<Sponsor[]> => {
  const payload = await getPayloadClient()

  const and: Where[] = []
  if (query.tiers && query.tiers.length) and.push({ tier: { in: query.tiers } })
  if (query.onlyFeatured) and.push({ isFeatured: { equals: true } })
  if (query.onlyCurrentlyActive) {
    const now = new Date().toISOString()
    and.push({ or: [{ startDate: { less_than_equal: now } }, { startDate: { exists: false } }] })
    and.push({ or: [{ endDate: { greater_than_equal: now } }, { endDate: { exists: false } }] })
  }

  const result = await payload.find({
    collection: 'sponsors',
    depth: 1,
    limit: query.limit,
    where: and.length ? { and } : undefined,
  })

  return result.docs
}

export const getSponsors = async (query: SponsorQuery): Promise<Sponsor[]> => {
  if (await isDraft()) return fetchSponsors(query)

  return unstable_cache(fetchSponsors, ['sponsors'], {
    tags: ['content', 'sponsors'],
    // Only the active-window variant depends on the clock.
    revalidate: query.onlyCurrentlyActive ? SPONSORS_TTL : false,
  })(query)
}

// ----------------------------------------------------------- archive posts

export type ArchivePostsQuery = {
  limit: number
  categoryIds: (number | string)[]
}

const ARCHIVE_SELECT = {
  title: true,
  slug: true,
  categories: true,
  heroImage: true,
  meta: { title: true, description: true, image: true },
} as const

const fetchArchivePosts = async (query: ArchivePostsQuery): Promise<Post[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: query.limit,
    ...(query.categoryIds.length ? { where: { categories: { in: query.categoryIds } } } : {}),
    select: ARCHIVE_SELECT,
  })

  return result.docs as Post[]
}

export const getArchivePosts = async (query: ArchivePostsQuery): Promise<Post[]> => {
  if (await isDraft()) return fetchArchivePosts(query)

  // No time window — tags alone are correct here.
  return unstable_cache(fetchArchivePosts, ['archive-posts'], {
    tags: ['content', 'posts'],
  })(query)
}
