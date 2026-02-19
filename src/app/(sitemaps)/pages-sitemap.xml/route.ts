import { getServerSideSitemap } from 'next-sitemap'
import type { ISitemapField } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import localization from '@/i18n/localization'

const locales = localization.locales.map((l) => l.code)

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
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

    // Static pages (search, posts listing) – one entry per locale
    const staticPaths = ['search', 'posts']
    for (const path of staticPaths) {
      for (const locale of locales) {
        sitemap.push({
          loc: `${SITE_URL}/${locale}/${path}`,
          lastmod: dateFallback,
          alternateRefs: locales.map((l) => ({
            href: `${SITE_URL}/${l}/${path}`,
            hreflang: l,
          })),
        })
      }
    }

    // CMS pages – one entry per locale per page
    if (results.docs) {
      for (const page of results.docs) {
        if (!page?.slug) continue
        const slug = page.slug === 'home' ? '' : page.slug
        for (const locale of locales) {
          sitemap.push({
            loc: `${SITE_URL}/${locale}${slug ? `/${slug}` : ''}`,
            lastmod: page.updatedAt || dateFallback,
            alternateRefs: locales.map((l) => ({
              href: `${SITE_URL}/${l}${slug ? `/${slug}` : ''}`,
              hreflang: l,
            })),
          })
        }
      }
    }

    return sitemap
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
