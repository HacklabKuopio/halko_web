import { getServerSideSitemap } from 'next-sitemap'
import type { ISitemapField } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import localization from '@/i18n/localization'

const locales = localization.locales.map((l) => l.code)

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()
    const sitemap: ISitemapField[] = []

    if (results.docs) {
      for (const post of results.docs) {
        if (!post?.slug) continue
        for (const locale of locales) {
          sitemap.push({
            loc: `${SITE_URL}/${locale}/posts/${post.slug}`,
            lastmod: post.updatedAt || dateFallback,
            alternateRefs: locales.map((l) => ({
              href: `${SITE_URL}/${l}/posts/${post.slug}`,
              hreflang: l,
            })),
          })
        }
      }
    }

    return sitemap
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()
  return getServerSideSitemap(sitemap)
}
