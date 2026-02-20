import type { Metadata } from 'next'

import type { Config, Media, Page, Post } from '@/payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import localization from '@/i18n/localization'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

interface GenerateMetaArgs {
  doc: Partial<Page> | Partial<Post> | null
  locale?: string
  /** URL path segment after /{locale}/, e.g. "posts/my-post" or "about" */
  path?: string
}

export const generateMeta = async (args: GenerateMetaArgs): Promise<Metadata> => {
  const { doc, locale = 'en', path } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const serverUrl = getServerSideURL()
  const websiteName = process.env.WEBSITE_NAME || 'MyWebsite'

  const title = doc?.meta?.title ? `${doc?.meta?.title} | ${websiteName}` : websiteName

  // Build the canonical path — always includes the active locale prefix
  const resolvedPath = path ?? (doc?.slug === 'home' ? '' : (doc?.slug ?? ''))
  const pathSuffix = resolvedPath ? `/${resolvedPath}` : ''
  const canonicalUrl = `${serverUrl}/${locale}${pathSuffix}`

  // Build hreflang alternates for every supported locale plus x-default
  const languages: Record<string, string> = {}
  for (const loc of localization.locales) {
    languages[loc.code] = `${serverUrl}/${loc.code}${pathSuffix}`
  }
  // x-default points to the default locale so it never duplicates the canonical
  languages['x-default'] = `${serverUrl}/${localization.defaultLocale}${pathSuffix}`

  return {
    title,
    description: doc?.meta?.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    publisher: websiteName,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
  }
}
