import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
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
