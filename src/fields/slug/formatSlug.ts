import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string | undefined =>
  val
    ?.normalize('NFD')               // split letters + accents
    .replace(/[\u0300-\u036f]/g, '')// remove accents (ä→a, ö→o, å→a)
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
