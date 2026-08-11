import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
  Plugin,
} from 'payload'

import { revalidateContent, revalidateGlobalContent } from '@/utilities/revalidate'

/**
 * Collections that must not trigger revalidation.
 *
 * Everything else is opted in automatically — including collections added later and
 * those injected by plugins — so a new collection can never silently ship without
 * cache invalidation. Individual collections can also opt out with
 * `custom: { skipRevalidation: true }`.
 */
const EXCLUDED_COLLECTIONS = new Set([
  // Every sign-in writes loginAttempts/lastLoggedIn.
  'users',
  // Public, high frequency, and never rendered on the site.
  'form-submissions',
  // Derived index, written *during* the posts afterChange — including it would run
  // a second full revalidation pass on every post save.
  'search',
])

const isTrue = (value: unknown): boolean => value === true || value === 'true'

/**
 * Payload sets `data._status = 'draft'` on an autosave while the published row is
 * untouched, so inside afterChange an autosave is indistinguishable from a genuine
 * unpublish. With `autosave.interval: 100` that fires roughly ten times a second
 * while an editor types. Discriminate on the query params the admin actually sends.
 */
const shouldSkipDraftWrite = (req: any, doc: any, previousDoc: any): boolean => {
  if (isTrue(req?.query?.autosave)) return true
  if (isTrue(req?.query?.draft) && doc?._status !== 'published') return true

  // Neither the new nor the previous version was ever public — nothing to invalidate.
  // A real publish→unpublish still passes this check.
  return doc?._status !== 'published' && previousDoc?._status !== 'published'
}

const buildAfterChange = (collection: CollectionConfig): CollectionAfterChangeHook => {
  const hasDrafts = Boolean((collection.versions as any)?.drafts)

  return ({ doc, previousDoc, req }) => {
    if (req?.context?.disableRevalidate) return doc
    if (hasDrafts && shouldSkipDraftWrite(req, doc, previousDoc)) return doc

    revalidateContent({
      collection: collection.slug,
      id: doc?.id,
      slug: doc?.slug,
      previousSlug: previousDoc?.slug,
      payload: req.payload,
      reason: 'afterChange',
    })

    return doc
  }
}

const buildAfterDelete = (collection: CollectionConfig): CollectionAfterDeleteHook => {
  return ({ doc, req }) => {
    if (req?.context?.disableRevalidate) return doc

    revalidateContent({
      collection: collection.slug,
      id: doc?.id,
      slug: doc?.slug,
      payload: req.payload,
      reason: 'afterDelete',
    })

    return doc
  }
}

const buildGlobalAfterChange = (global: GlobalConfig): GlobalAfterChangeHook => {
  return ({ doc, req }) => {
    if (req?.context?.disableRevalidate) return doc

    revalidateGlobalContent(global.slug, req.payload)

    return doc
  }
}

/**
 * Attaches revalidation hooks to every collection and global.
 *
 * Must be registered **last** in the plugin array: Payload folds plugins in order,
 * each receiving the accumulated config, so only the final plugin sees the
 * collections injected by earlier ones (redirects, forms, search). Payload's own
 * `payload-*` collections are appended after plugins run and are never touched.
 */
export const revalidationPlugin: Plugin = (config) => {
  const attached: string[] = []

  config.collections = (config.collections ?? []).map((collection) => {
    if (EXCLUDED_COLLECTIONS.has(collection.slug)) return collection
    if ((collection.custom as any)?.skipRevalidation) return collection

    attached.push(collection.slug)

    return {
      ...collection,
      hooks: {
        ...collection.hooks,
        afterChange: [...(collection.hooks?.afterChange ?? []), buildAfterChange(collection)],
        afterDelete: [...(collection.hooks?.afterDelete ?? []), buildAfterDelete(collection)],
      },
    }
  })

  config.globals = (config.globals ?? []).map((global) => ({
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), buildGlobalAfterChange(global)],
    },
  }))

  // Boot-time visibility: a newly added collection is either listed here or it is not
  // being revalidated.
  const globalSlugs = (config.globals ?? []).map((global) => global.slug)
  console.log(
    `[revalidation] collections: ${attached.join(', ')} | globals: ${globalSlugs.join(', ')}`,
  )

  return config
}
