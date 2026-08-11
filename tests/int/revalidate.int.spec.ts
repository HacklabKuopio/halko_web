import { beforeEach, describe, expect, it, vi } from 'vitest'

const revalidatePath = vi.fn()
const revalidateTag = vi.fn()

vi.mock('next/cache', () => ({
  revalidatePath: (...args: unknown[]) => revalidatePath(...args),
  revalidateTag: (...args: unknown[]) => revalidateTag(...args),
}))

const { revalidateContent, revalidateGlobalContent } = await import('@/utilities/revalidate')

const paths = () => revalidatePath.mock.calls.map(([path]) => path)
const tags = () => revalidateTag.mock.calls.map(([tag]) => tag)

beforeEach(() => {
  revalidatePath.mockReset()
  revalidateTag.mockReset()
})

describe('revalidateContent', () => {
  it('prefixes page paths with every locale', () => {
    revalidateContent({ collection: 'pages', id: 1, slug: 'gdpr' })

    expect(paths()).toContain('/en/gdpr')
    expect(paths()).toContain('/fi/gdpr')
    // The original bug: an unprefixed path matches no cache entry, because
    // localePrefix is 'always' and every prerendered route is /en/... or /fi/...
    expect(paths()).not.toContain('/gdpr')
  })

  it('maps the home page to the locale roots', () => {
    revalidateContent({ collection: 'pages', id: 1, slug: 'home' })

    expect(paths()).toEqual(expect.arrayContaining(['/en', '/fi']))
    expect(paths()).not.toContain('/en/home')
  })

  it('prefixes post paths with locale and the posts segment', () => {
    revalidateContent({ collection: 'posts', id: 7, slug: 'hello' })

    expect(paths()).toEqual(expect.arrayContaining(['/en/posts/hello', '/fi/posts/hello']))
  })

  it('also invalidates the previous path when a slug is renamed', () => {
    revalidateContent({ collection: 'pages', id: 1, slug: 'new', previousSlug: 'old' })

    expect(paths()).toEqual(expect.arrayContaining(['/en/new', '/fi/new', '/en/old', '/fi/old']))
    expect(tags()).toEqual(expect.arrayContaining(['pages_new', 'pages_old']))
  })

  it('emits tags but no document paths for collections without their own route', () => {
    revalidateContent({ collection: 'events', id: 3, slug: 'kickoff' })

    expect(paths()).toEqual(['/'])
    expect(tags()).toEqual(expect.arrayContaining(['content', 'events', 'events_3']))
  })

  it('expires tags immediately rather than marking them stale', () => {
    revalidateContent({ collection: 'pages', id: 1, slug: 'gdpr' })

    // 'max' would serve the old page on the editor's first refresh.
    for (const [, profile] of revalidateTag.mock.calls) {
      expect(profile).toEqual({ expire: 0 })
    }
  })

  it('fires the site-wide layout purge', () => {
    revalidateContent({ collection: 'media', id: 9 })

    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does not throw when there is no Next request scope', () => {
    revalidatePath.mockImplementation(() => {
      throw new Error('Invariant: static generation store missing')
    })

    expect(() => revalidateContent({ collection: 'pages', id: 1, slug: 'gdpr' })).not.toThrow()
  })
})

describe('revalidateGlobalContent', () => {
  it('expires the global tag for every locale', () => {
    revalidateGlobalContent('header')

    expect(tags()).toEqual(
      expect.arrayContaining(['global_header', 'global_header_en', 'global_header_fi']),
    )
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })
})
