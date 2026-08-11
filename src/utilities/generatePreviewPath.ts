import { CollectionSlug, PayloadRequest } from 'payload'

/**
 * Route prefix for each collection that renders its own page under `/[locale]`.
 * Shared with `@/utilities/revalidate` so preview paths and revalidation paths
 * cannot drift apart. A collection absent from this map has no page of its own.
 */
export const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // We intentionally exclude the locale from the path here because the application routing
  // prefixes the locale automatically (e.g. /fi). Including it here caused duplicated segments
  // like /fi/posts/fi/slug. Desired: /fi/posts/slug.
  const prefix = collectionPrefixMap[collection] || ''
  const cleanSlug = slug.replace(/^\/+/, '')
  const path = `${prefix}/${cleanSlug}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'

  const encodedParams = new URLSearchParams({
    slug: cleanSlug,
    collection,
    path, // locale will be auto-prefixed by the runtime
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}
