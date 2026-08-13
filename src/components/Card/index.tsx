'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
// next-intl's Link, not next/link — localePrefix is 'always', so a bare href of
// /posts/<slug> would drop the locale and force a cookie-based redirect on every click.
import { Link } from '@/i18n/routing'
import { useFormatter } from 'next-intl'
import { ImageOff } from 'lucide-react'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'heroImage' | 'publishedAt'
>
export type CardProjectData = CardPostData
export type CardDocData = CardPostData | CardProjectData

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardDocData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const format = useFormatter()
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { image: metaImage } = meta || {}
  // Prefer explicit meta image, otherwise fall back to heroImage
  const heroImage = (doc as CardPostData)?.heroImage as any
  const primaryImage = metaImage || heroImage

  const categoryTitles = (Array.isArray(categories) ? categories : [])
    .map((category) => (typeof category === 'object' && category ? category.title : null))
    .filter((title): title is string => Boolean(title))

  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-border bg-card',
        'transition-colors hover:border-foreground/30 hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {/*
        A fixed aspect ratio is what makes every image the same height, in a row and across
        rows. Previously Media rendered without `fill`, which applies height:auto and lets
        each image keep its own aspect ratio.
      */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        {primaryImage && typeof primaryImage === 'object' ? (
          <Media
            resource={primaryImage}
            fill
            size="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imgClassName="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <ImageOff aria-hidden size={32} />
          </div>
        )}
      </div>

      <div className="flex grow flex-col gap-3 p-5">
        {titleToUse && (
          <h3 className="text-lg font-semibold leading-snug tracking-tight">
            <Link href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {/* mt-auto pins this row to the bottom, so metadata lines up across a row no
            matter how many lines each title wraps to. */}
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {publishedAt && (
            <time dateTime={publishedAt}>
              {format.dateTime(new Date(publishedAt), {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
          {showCategories && categoryTitles.length > 0 && (
            <>
              {publishedAt && <span aria-hidden>·</span>}
              <span className="uppercase tracking-wide">{categoryTitles.join(', ')}</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
