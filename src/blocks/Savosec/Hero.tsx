import { Calendar, MapPin, Clock } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import type { Page } from '@/payload-types'

type Props = {
  title: string
  subtitle: string
  description: string
  date: string
  time: string
  location: string
  freeEventText: string
  registerLink: {
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
  scheduleLink: {
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

const Hero: React.FC<Props> = ({
  title,
  subtitle,
  description,
  date,
  time,
  location,
  freeEventText,
  registerLink,
  scheduleLink,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-60px)] flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated background elements — hidden on mobile to reduce GPU load */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glitch title effect */}
          <div className="mb-6">
            <span className="font-mono text-sm text-primary tracking-[0.3em] uppercase">
              KuoSec ry presents
            </span>
          </div>

          <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold mb-6 cyber-glow-text">
            {/* Simple split for styling assuming defaults, but rendering full title if dynamic needs handling.
                For now rendering the prop. Ideally we might want separate fields for coloring.
                Let's try to parse if it matches "SavoSec 2025" pattern or just render the title.
             */}
            <span
              dangerouslySetInnerHTML={{
                __html:
                  title
                    ?.replace('Savo', '<span class="text-primary">Savo</span>')
                    .replace('Sec', '<span class="text-accent">Sec</span>')
                    .replace(/ (\d{4})$/, ' <span class="text-foreground">$1</span>') || '',
              }}
            />
          </h1>

          <p className="font-mono text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <p className="text-lg text-foreground/80 mb-12 max-w-xl mx-auto">{description}</p>

          {/* Event details cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-card border border-primary/30 rounded-lg cyber-border">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm">{date}</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-card border border-primary/30 rounded-lg cyber-border">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm">{time}</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-card border border-primary/30 rounded-lg cyber-border">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm">{location}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CMSLink
              {...registerLink}
              /* Added: h-12 (fixed height), inline-flex, items-center */
              className="h-12 inline-flex items-center justify-center px-8 bg-primary text-primary-foreground font-mono font-semibold rounded-lg cyber-glow hover:scale-105 transition-transform"
            />
            <CMSLink
              {...scheduleLink}
              /* Added: h-12 (same fixed height), inline-flex, items-center */
              className="h-12 inline-flex items-center justify-center px-8 bg-transparent border-2 border-primary text-primary font-mono font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
            />
          </div>

          {/* Free event badge */}
          <div className="mt-12">
            <span className="inline-block px-4 py-2 bg-accent/20 border border-accent/40 text-accent font-mono text-sm rounded-full">
              {freeEventText}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
