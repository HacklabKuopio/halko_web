import { ChevronDown, Mail } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/payload-types'
import NextImage from 'next/image'

export interface HeroSectionBlock {
  blockType: 'heroSection'
  title?: string | null
  highlight?: string | null
  subtitle?: string | null
  tagline?: string | null
  logo?: number | Media | null
  primaryLink?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: number | string
        } | null)
      | ({
          relationTo: 'posts'
          value: number | string
        } | null)
    url?: string | null
    label: string
    appearance?: ('default' | 'inline' | 'button') | null
  }
  contactLink?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: number | string
        } | null)
      | ({
          relationTo: 'posts'
          value: number | string
        } | null)
    url?: string | null
    label: string
    appearance?: ('default' | 'inline' | 'button') | null
  }
}

const HeroSection = (props: HeroSectionBlock) => {
  const { title, highlight, subtitle, tagline, logo, primaryLink, contactLink } = props

  const logoObj = logo && typeof logo === 'object' ? logo : null
  const logoUrl = (logoObj?.url || '') as string
  const logoAlt = (logoObj?.alt || 'KuoSec Logo') as string

  const hasPrimary = primaryLink && (primaryLink.url || primaryLink.reference)
  const primaryLinkProps = hasPrimary
    ? primaryLink
    : {
        type: 'custom',
        url: '#events',
        label: 'Upcoming Events',
        appearance: 'default',
      }

  const hasContact = contactLink && (contactLink.url || contactLink.reference)
  const contactLinkProps = hasContact
    ? contactLink
    : {
        type: 'custom',
        url: 'mailto:info@kuosec.fi',
        label: 'Contact Us',
        appearance: 'default',
      }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pb-16">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo */}
        {logoUrl && (
          <div className="mb-8 md:animate-float">
            <NextImage
              src={logoUrl}
              alt={logoAlt}
              width={224}
              height={224}
              className="w-40 h-40 md:w-56 md:h-56 mx-auto glow rounded-full"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">
          {title} <span className="text-primary">{highlight}</span>
        </h1>

        {/* Subtitle with terminal style */}
        <div className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-md mb-8">
          <span className="text-terminal-green">$</span>
          <span className="text-muted-foreground font-mono">{subtitle}</span>
          <span className="w-2 h-5 bg-primary terminal-cursor"></span>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          {tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CMSLink
            {...(primaryLinkProps as any)}
            appearance="inline"
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:glow transition-all"
          >
            <ChevronDown className="group-hover:translate-y-1 transition-transform" size={18} />
          </CMSLink>
          <CMSLink
            {...(contactLinkProps as any)}
            appearance="inline"
            className="flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded-md font-semibold hover:bg-primary/10 transition-all"
          >
            <Mail size={18} />
          </CMSLink>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="text-primary" size={32} />
      </div>
    </section>
  )
}

export default HeroSection
