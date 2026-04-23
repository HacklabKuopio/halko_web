import { CMSLink } from '@/components/Link'
import type { Media, Page } from '@/payload-types'
import React from 'react'

interface Sponsor {
  name: string
  url?: string | null
  logo?: Media | number | null
  id?: string | null
}

type Props = {
  subtitle: string
  title: string
  backgroundTitle?: string
  sponsors: Sponsor[]
  becomeSponsorText: string
  contactLink: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: number | string | Page
        } | null)
      | ({
          relationTo: 'posts'
          value: number | string
        } | null)
    url?: string | null
    label?: string | null
  }
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const logo = sponsor.logo && typeof sponsor.logo === 'object' ? (sponsor.logo as Media) : null

  const content = logo?.url ? (
    <img
      src={logo.url}
      alt={logo.alt || sponsor.name}
      className="h-10 md:h-12 w-auto object-contain max-w-[160px]"
    />
  ) : (
    <span
      className={[
        'font-mono text-xl',
        sponsor.url
          ? 'text-muted-foreground group-hover:text-primary transition-colors'
          : 'text-muted-foreground',
      ].join(' ')}
    >
      {sponsor.name}
    </span>
  )

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        title={sponsor.name}
        className="group px-8 py-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 flex items-center justify-center"
      >
        {content}
      </a>
    )
  }

  return (
    <div
      title={sponsor.name}
      className="px-8 py-6 bg-card border border-border rounded-lg flex items-center justify-center"
    >
      {content}
    </div>
  )
}

const Sponsors: React.FC<Props> = ({
  subtitle,
  title,
  sponsors,
  becomeSponsorText,
  contactLink,
}) => {
  return (
    <section id="sponsors" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            {subtitle}
          </span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mt-4">
            <span
              dangerouslySetInnerHTML={{
                __html:
                  title?.replace(
                    'mahdollistajat',
                    '<span class="text-primary">mahdollistajat</span>',
                  ) || '',
              }}
            />
          </h2>
        </div>

        {/* Sponsors grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {sponsors?.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>

        {/* Become sponsor CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">{becomeSponsorText}</p>
          <CMSLink
            {...contactLink}
            label={null}
            className="inline-flex items-center gap-2 font-mono text-primary hover:text-primary/80 transition-colors"
          >
            {contactLink?.label} →
          </CMSLink>
        </div>
      </div>
    </section>
  )
}

export default Sponsors
