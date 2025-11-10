import type {CollectionAfterChangeHook, CollectionAfterDeleteHook} from 'payload'

import {revalidatePath, revalidateTag} from 'next/cache'

import type {Project} from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      if (slug) {
        const path = `/projects/${slug}`
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
        revalidateTag('projects-sitemap')
      } else {
        payload.logger.warn('Skipping revalidation: project has no slug')
      }
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldSlug = typeof previousDoc.slug === 'string' ? previousDoc.slug : ''
      if (oldSlug) {
        const oldPath = `/projects/${oldSlug}`
        payload.logger.info(`Revalidating old post at path: ${oldPath}`)
        revalidatePath(oldPath)
        revalidateTag('projects-sitemap')
      } else {
        payload.logger.warn('Skipping revalidation of old path: previous project had no slug')
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Project> = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    const slug = typeof doc?.slug === 'string' ? doc.slug : ''
    if (slug) {
      const path = `/projects/${slug}`
      revalidatePath(path)
      revalidateTag('projects-sitemap')
    } else {
      payload.logger?.warn?.('Skipping revalidation on delete: project had no slug')
    }
  }

  return doc
}
