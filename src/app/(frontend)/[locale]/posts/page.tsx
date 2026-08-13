import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-static'
export const revalidate = 600

const POSTS_PER_PAGE = 12

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  // Required in every page (not just the layout) for next-intl to render statically.
  setRequestLocale(locale)

  const t = await getTranslations()
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    overrideAccess: false,
    sort: '-publishedAt',
    locale: locale as 'en' | 'fi',
    select: {
      title: true,
      slug: true,
      categories: true,
      heroImage: true,
      publishedAt: true,
      meta: {
        title: true,
        description: true,
        image: true,
      },
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-6">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('posts')}</h1>
      </div>

      <div className="container mb-8">
        <PageRange
          currentPage={posts.page}
          limit={POSTS_PER_PAGE}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive docs={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale = 'en' } = await params

  // Use the shared generateMeta utility so canonical and hreflang alternates
  // are generated consistently (includes x-default and locale prefix).
  return generateMeta({ doc: null, locale, path: 'posts' })
}
