import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .normalize('NFD') // split letters + accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents (ä→a, ö→o, å→a)
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return format(value)
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }

export default formatSlug
