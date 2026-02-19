import React from 'react'
import { Media } from '@/payload-types'

interface Speaker {
  name: string
  title: string
  company: string
  bio: string
  initials: string
  image?: Media | string | null
  id?: string | null
}

type Props = {
  subtitle: string
  title: string
  speakers: Speaker[]
}

const Speakers: React.FC<Props> = ({ subtitle, title, speakers }) => {
  return (
    <section id="speakers" className="py-24 bg-secondary/30 relative">
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
                  title?.replace('lavalla', '<span class="text-primary">lavalla</span>') || '',
              }}
            />
          </h2>
        </div>

        {/* Speakers grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {speakers?.map((speaker, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors overflow-hidden">
                {speaker.image && typeof speaker.image === 'object' && speaker.image.url ? (
                  <img
                    src={speaker.image.url}
                    alt={speaker.image.alt || speaker.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-2xl font-bold text-primary">
                    {speaker.initials}
                  </span>
                )}
              </div>

              {/* Speaker info */}
              <div className="text-center">
                <h3 className="font-mono font-bold text-lg mb-1">{speaker.name}</h3>
                <p className="text-primary text-sm font-medium mb-1">{speaker.title}</p>
                <p className="text-muted-foreground text-sm mb-4">{speaker.company}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{speaker.bio}</p>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Speakers
