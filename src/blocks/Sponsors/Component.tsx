import React from 'react'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Sponsor, SponsorsBlock as SponsorsBlockType } from '@/payload-types'

// Local props to keep the block flexible in the app layer
// Mirrors fields defined in ./config.ts
type SponsorsBlockProps = Pick<
  SponsorsBlockType,
  'id' | 'heading' | 'introContent' | 'tiers' | 'onlyFeatured' | 'onlyCurrentlyActive' | 'limit'
>

type BaseProps = {
  breakout?: boolean
  className?: string
  enableGutter?: boolean
  disableInnerContainer?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  locale?: any
}

const TIERS_ORDER = ['platinum', 'gold', 'silver', 'bronze', 'community'] as const

function getTierRank(tier?: Sponsor['tier'] | null): number {
  const idx = TIERS_ORDER.indexOf((tier ?? 'community') as (typeof TIERS_ORDER)[number])
  return idx === -1 ? TIERS_ORDER.length : idx
}

function formatDate(value?: string | null): string | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString()
}

export const SponsorsBlock: React.FC<SponsorsBlockProps & BaseProps> = async (props) => {
  const {
    id,
    heading,
    introContent,
    tiers,
    onlyFeatured = false,
    onlyCurrentlyActive = true,
    limit = 50,
    className,
    enableGutter = true,
    disableInnerContainer,
    imgClassName,
  } = props

  const payload = await getPayload({ config: configPromise })

  // Build where clause based on provided filters
  const and: any[] = []
  if (tiers && tiers.length) and.push({ tier: { in: tiers } })
  if (onlyFeatured) and.push({ isFeatured: { equals: true } })
  if (onlyCurrentlyActive) {
    const now = new Date().toISOString()
    and.push({ or: [{ startDate: { lte: now } }, { startDate: { exists: false } }] })
    and.push({ or: [{ endDate: { gte: now } }, { endDate: { exists: false } }] })
  }

  const limitValue = (limit ?? 50) as number
  const normalizedLimit = limitValue > 0 ? Math.min(limitValue, 200) : 50

  const result = await payload.find({
    collection: 'sponsors',
    depth: 1,
    limit: normalizedLimit,
    where: and.length ? { and } : undefined,
  })

  const sponsors = [...result.docs].sort((a: Sponsor, b: Sponsor) => {
    // Featured first
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    // Tier order
    const tierDiff = getTierRank(a.tier) - getTierRank(b.tier)
    if (tierDiff) return tierDiff
    // Custom order ascending
    const ao = typeof a.order === 'number' ? a.order : 0
    const bo = typeof b.order === 'number' ? b.order : 0
    if (ao !== bo) return ao - bo
    // Fallback: name
    return (a.name || '').localeCompare(b.name || '')
  })

  return (
    <section id={id ? `block-${id}` : undefined} className={cn('', className)}>
      {(heading || introContent) && (
        <div className={cn('mb-8', { container: enableGutter })}>
          {heading && <h2 className="text-2xl font-semibold tracking-tight mb-3">{heading}</h2>}
          {introContent && (
            <div className={cn({ container: !disableInnerContainer })}>
              <RichText data={introContent} enableGutter={false} />
            </div>
          )}
        </div>
      )}

      <div className={cn({ container: enableGutter })}>
        {sponsors.length === 0 ? (
          <div className="text-sm text-muted-foreground">No sponsors to display.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {sponsors.map((sponsor: Sponsor) => {
              const lightLogo = sponsor.lightLogo as any
              const darkLogo = sponsor.darkLogo as any
              const hasLight = Boolean(lightLogo)
              const hasDark = Boolean(darkLogo)
              const both = hasLight && hasDark

              const LogoContent = (
                <>
                  {both ? (
                    <>
                      <Media
                        resource={lightLogo}
                        alt={`${sponsor.name || 'Sponsor'} logo`}
                        imgClassName={cn(
                          'max-h-16 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 block dark:hidden rounded-lg p-2 border border-border bg-background',
                          imgClassName,
                        )}
                      />
                      <Media
                        resource={darkLogo}
                        alt={`${sponsor.name || 'Sponsor'} logo`}
                        imgClassName={cn(
                          'max-h-16 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 hidden dark:block rounded-lg p-2 border border-border bg-background',
                          imgClassName,
                        )}
                      />
                    </>
                  ) : hasLight ? (
                    <Media
                      resource={lightLogo}
                      alt={`${sponsor.name || 'Sponsor'} logo`}
                      imgClassName={cn(
                        'max-h-16 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 block rounded-lg p-2 border border-border bg-background',
                        imgClassName,
                      )}
                    />
                  ) : hasDark ? (
                    <Media
                      resource={darkLogo}
                      alt={`${sponsor.name || 'Sponsor'} logo`}
                      imgClassName={cn(
                        'max-h-16 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 block rounded-lg p-2 border border-border bg-background',
                        imgClassName,
                      )}
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">{sponsor.name}</span>
                  )}
                </>
              )

              const start = formatDate(sponsor.startDate || undefined)
              const end = formatDate(sponsor.endDate || undefined)

              return (
                <li key={String(sponsor.id)} className="group">
                  <div className="h-full flex flex-col rounded-xl border border-border bg-card/40 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-shadow">
                    {sponsor.website ? (
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center mb-4"
                        aria-label={sponsor.name}
                        title={sponsor.name}
                      >
                        {LogoContent}
                      </a>
                    ) : (
                      <div className="flex items-center justify-center mb-4">{LogoContent}</div>
                    )}

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold leading-none tracking-tight">
                          {sponsor.name}
                        </h3>
                        {sponsor.tier && (
                          <span
                            className={cn(
                              'text-xs font-medium px-2 py-1 rounded-md capitalize',
                              {
                                platinum:
                                  'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-900 border border-border',
                                gold: 'bg-yellow-400/90 text-yellow-950',
                                silver: 'bg-slate-300/80 text-slate-800',
                                bronze: 'bg-amber-600/80 text-amber-50',
                                community: 'bg-indigo-600/80 text-indigo-50',
                              }[sponsor.tier] || 'bg-muted text-foreground',
                            )}
                          >
                            {sponsor.tier}
                          </span>
                        )}
                        {sponsor.isFeatured && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider bg-accent/80 text-accent-foreground px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      {sponsor.about && (
                        <div className="text-sm text-muted-foreground line-clamp-4">
                          <RichText data={sponsor.about as any} enableGutter={false} />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-1">
                        {start && (
                          <span className="text-[11px] text-muted-foreground">Start: {start}</span>
                        )}
                        {end && (
                          <span className="text-[11px] text-muted-foreground">End: {end}</span>
                        )}
                        {typeof sponsor.order === 'number' && sponsor.order !== 0 && (
                          <span className="text-[11px] text-muted-foreground">
                            Order: {sponsor.order}
                          </span>
                        )}
                      </div>

                      {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-primary hover:underline mt-1"
                        >
                          Visit website →
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
