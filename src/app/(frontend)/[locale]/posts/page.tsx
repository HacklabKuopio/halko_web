import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

import { getServerSideURL } from '@/utilities/getURL'
import localization from '@/i18n/localization'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      heroImage: true,
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
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
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

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return params.then(({ locale = 'en' }) => {
    const serverUrl = getServerSideURL()
    const websiteName = process.env.WEBSITE_NAME || 'MyWebsite'
    const canonicalUrl = `${serverUrl}/${locale}/posts`
    const languages: Record<string, string> = {}
    for (const loc of localization.locales) {
      languages[loc.code] = `${serverUrl}/${loc.code}/posts`
    }
    return {
      title: `${websiteName} Posts`,
      alternates: { canonical: canonicalUrl, languages },
      robots: { index: true, follow: true },
      publisher: websiteName,
    }
  })
}
