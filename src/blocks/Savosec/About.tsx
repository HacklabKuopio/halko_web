import { Shield, Users, Wifi, Terminal, ExternalLink } from 'lucide-react'
import React from 'react'

type Props = {
  subtitle: string
  title: string
  description: string
  features: {
    icon: 'Shield' | 'Users' | 'Wifi' | 'Terminal'
    title: string
    description: string
    url?: string | null
    id?: string | null
  }[]
}

const iconMap = {
  Shield,
  Users,
  Wifi,
  Terminal,
}

const About: React.FC<Props> = ({ subtitle, title, description, features }) => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-primary tracking-widest uppercase">
              {subtitle}
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold mt-4 mb-6">
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    title?.replace('SavoSec', '<span class="text-primary">SavoSec</span>') || '',
                }}
              />
            </h2>
          </div>

          {/* Main description */}
          <div className="bg-card border border-primary/20 rounded-xl p-8 mb-16 cyber-border scanline">
            <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features?.map((feature, index) => {
              const Icon = feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : Shield
              const isLink = !!feature.url

              const inner = (
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      'p-3 bg-primary/10 rounded-lg shrink-0',
                      isLink ? 'group-hover:bg-primary/20 transition-colors' : '',
                    ].join(' ')}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-mono font-semibold text-lg">{feature.title}</h3>
                      {isLink && (
                        <ExternalLink className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )

              if (isLink) {
                return (
                  <a
                    key={index}
                    href={feature.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 block"
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <div key={index} className="p-6 bg-card border border-border rounded-lg">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
