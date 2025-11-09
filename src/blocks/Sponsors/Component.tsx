import React from 'react'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Local props type to avoid depending on regenerated payload-types right away
// Mirrors fields defined in ./config.ts
type SponsorsBlockProps = {
  id?: string
  heading?: string | null
  introContent?: any
  tiers?: Array<'platinum' | 'gold' | 'silver' | 'bronze' | 'community'>
  onlyFeatured?: boolean
  onlyCurrentlyActive?: boolean
  limit?: number
}

type BaseProps = {
  breakout?: boolean
  className?: string
  enableGutter?: boolean
  disableInnerContainer?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  locale?: any
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

  const where: any = { and: [] as any[] }
  if (tiers && tiers.length > 0) {
    where.and.push({ tier: { in: tiers } })
  }
  if (onlyFeatured) {
    where.and.push({ isFeatured: { equals: true } })
  }
  if (onlyCurrentlyActive) {
    const now = new Date().toISOString()
    where.and.push({ or: [{ startDate: { lte: now } }, { startDate: { exists: false } }] })
    where.and.push({ or: [{ endDate: { gte: now } }, { endDate: { exists: false } }] })
  }

  const result = await payload.find({
    collection: 'sponsors',
    depth: 1,
    limit,
    where: where.and.length > 0 ? where : undefined,
  })

  const tiersOrder = ['platinum', 'gold', 'silver', 'bronze', 'community'] as const
  const tierRank = (t?: string | null) => {
    const idx = tiersOrder.indexOf((t || 'community') as any)
    return idx === -1 ? tiersOrder.length : idx
  }

  const sponsors = [...result.docs].sort((a: any, b: any) => {
    // Featured first
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    // Tier order
    const tr = tierRank(a.tier) - tierRank(b.tier)
    if (tr !== 0) return tr
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
          {heading && (
            <h2 className="text-2xl font-semibold tracking-tight mb-3">{heading}</h2>
          )}
          {introContent && (
            <div className={cn({ container: !disableInnerContainer })}>
              <RichText data={introContent} enableGutter={false} />
            </div>
          )}
        </div>
      )}

      <div className={cn({ container: enableGutter })}>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {sponsors.map((sponsor: any) => {
            const href = sponsor.website || `/sponsors/${sponsor.slug}`
            const logo = sponsor.lightLogo || sponsor.darkLogo
            return (
              <li key={sponsor.id} className="flex items-center justify-center">
                {logo ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center"
                    aria-label={sponsor.name}
                    title={sponsor.name}
                  >
                    <Media
                      imgClassName={cn(
                        'max-h-16 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 border border-border rounded-[0.8rem] p-3 bg-background',
                        imgClassName,
                      )}
                      resource={logo}
                    />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{sponsor.name}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
