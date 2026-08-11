import type { ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import type { CardPostData } from '@/components/Card'

import { getArchivePosts } from '@/utilities/cachedQueries'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: CardPostData[] = []

  if (populateBy === 'collection') {
    const flattenedCategories =
      categories?.map((category) => {
        if (typeof category === 'object') return category.id
        else return category
      }) ?? []

    const fetchedPosts = await getArchivePosts({ limit, categoryIds: flattenedCategories })

    posts = fetchedPosts as CardPostData[]
  } else {
    if (selectedDocs?.length) {
      posts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as CardPostData[]
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive docs={posts} relationTo="posts" />
    </div>
  )
}
