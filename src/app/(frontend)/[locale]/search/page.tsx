import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { getServerSideURL } from '@/utilities/getURL'
import localization from '@/i18n/localization'
import type { TypedLocale } from 'payload'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Args = {
  params: Promise<{ locale: TypedLocale }>
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ params, searchParams: searchParamsPromise }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    locale,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: {
        title: true,
        description: true,
        image: true,
      },
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">{t('search')}</h1>

          <div className="max-w-200 mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive docs={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">{t('no-results')}</div>
      )}
    </div>
  )
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return params.then(async ({ locale = 'en' }) => {
    const t = await getTranslations({ locale })
    const serverUrl = getServerSideURL()
    const websiteName = process.env.WEBSITE_NAME || 'MyWebsite'
    const canonicalUrl = `${serverUrl}/${locale}/search`
    const languages: Record<string, string> = {}
    for (const loc of localization.locales) {
      languages[loc.code] = `${serverUrl}/${loc.code}/search`
    }
    return {
      title: `${t('search')} | ${websiteName}`,
      alternates: { canonical: canonicalUrl, languages },
      robots: { index: false, follow: true },
      publisher: websiteName,
    }
  })
}
