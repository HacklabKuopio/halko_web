import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

function hasRichTextContent(rtf: any): boolean {
  try {
    const children = rtf?.root?.children
    return Array.isArray(children) && children.length > 0
  } catch {
    return false
  }
}

function mergeFooterLocalized(primary: any, fallback: any): any {
  const merged: any = { ...fallback, ...primary }

  // about
  merged.about = hasRichTextContent(primary?.about) ? primary.about : fallback?.about

  // bottom text
  merged.bottomText = primary?.bottomText ?? fallback?.bottomText ?? null

  // columns with links
  const pCols = Array.isArray(primary?.columns) ? primary.columns : []
  const fCols = Array.isArray(fallback?.columns) ? fallback.columns : []
  merged.columns = (pCols.length > 0 ? pCols : fCols).map((col: any, i: number) => {
    const fCol = fCols[i] || {}
    const pCol = pCols[i] || {}
    const out: any = { ...fCol, ...pCol }
    // title
    out.title = pCol?.title ?? fCol?.title

    // links array
    const pLinks = Array.isArray(pCol?.links) ? pCol.links : []
    const fLinks = Array.isArray(fCol?.links) ? fCol.links : []
    out.links = (pLinks.length > 0 ? pLinks : fLinks).map((item: any, j: number) => {
      const fItem = fLinks[j] || {}
      const pItem = pLinks[j] || {}
      const outItem: any = { ...fItem, ...pItem }
      const pLink = pItem?.link || {}
      const fLink = fItem?.link || {}
      outItem.link = {
        ...fLink,
        ...pLink,
        label: pLink?.label ?? fLink?.label,
        url: pLink?.url ?? fLink?.url,
      }
      return outItem
    })

    return out
  })

  // socialLinks
  const pSocial = Array.isArray(primary?.socialLinks) ? primary.socialLinks : []
  const fSocial = Array.isArray(fallback?.socialLinks) ? fallback.socialLinks : []
  merged.socialLinks = (pSocial.length > 0 ? pSocial : fSocial).map((item: any, i: number) => {
    const fItem = fSocial[i] || {}
    const pItem = pSocial[i] || {}
    return {
      ...fItem,
      ...pItem,
      alt: pItem?.alt ?? fItem?.alt,
      link: {
        ...(fItem?.link || {}),
        ...(pItem?.link || {}),
        url: pItem?.link?.url ?? fItem?.link?.url,
      },
    }
  })

  return merged
}

export async function Footer({ locale }: { locale: TypedLocale }) {
  // fetch current-locale and default-locale (en) globals
  const getPrimary = getCachedGlobal('footer', 2, locale)
  const getFallback = getCachedGlobal('footer', 2, 'en' as any)
  const primary = (await getPrimary()) as any as FooterType
  const fallback = (await getFallback()) as any as FooterType

  const footer: any = mergeFooterLocalized(primary, fallback)

  const columns = (footer as any)?.columns || []
  const social = (footer as any)?.socialLinks || []
  const bottomText = (footer as any)?.bottomText

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container py-10">
        {/* Top section: brand/about + link columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + about */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link className="inline-flex items-center" href="/">
              {footer?.logo ? (
                <Media
                  resource={footer.logo as any}
                  imgClassName="h-24 w-auto object-contain"
                  pictureClassName="block"
                />
              ) : (
                <span className="text-xl font-semibold">Site</span>
              )}
            </Link>
            {footer?.about && hasRichTextContent(footer.about) && (
              <RichText
                data={footer.about as any}
                enableGutter={false}
                enableProse={false}
                className="text-muted-foreground"
              />
            )}
            {/* Theme selector on desktop near brand */}
            <div className="hidden md:block">
              <ThemeSelector />
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {columns.map((col: any, idx: number) => (
              <div key={idx}>
                {!col.hideTitle && col.title && (
                  <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground uppercase">
                    {col.title}
                  </h3>
                )}
                <ul className="space-y-3">
                  {(col.links || []).map(({ link }: any, i: number) => (
                    <li key={i}>
                      <CMSLink className="text-muted-foreground hover:text-foreground transition-colors" {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-border pt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Bottom left text */}
          <p className="text-sm text-gray-400">
            {bottomText || `© ${new Date().getFullYear()} All rights reserved.`}
          </p>

          {/* Social icons + theme switcher on mobile */}
          <div className="flex items-center gap-5">
            <div className="md:hidden">
              <ThemeSelector />
            </div>
            {social.map((item: any, i: number) => (
              <CMSLink key={i} {...(item.link as any)}>
                {item.icon ? (
                  <Media
                    resource={item.icon as any}
                    imgClassName="h-5 w-5 object-contain"
                    pictureClassName="block"
                    alt={(item.alt as any) || ''}
                  />
                ) : (
                  <span className="sr-only">Social link</span>
                )}
              </CMSLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
