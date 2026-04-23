'use client'

import React, { useEffect, useState } from 'react'
import { X, ChevronRight } from 'lucide-react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import { Media } from '@/payload-types'

interface Speaker {
  name: string
  title: string
  company: string
  bio: string
  richContent?: DefaultTypedEditorState | null
  initials: string
  image?: Media | string | null
  id?: string | null
}

type Props = {
  subtitle: string
  title: string
  speakers: Speaker[]
}

function SpeakerModal({ speaker, onClose }: { speaker: Speaker; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={speaker.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel — bottom-sheet on mobile, centered card on sm+ */}
      <div className="relative w-full sm:max-w-2xl bg-card border border-primary/30 rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col">
        {/* Top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-border">
          <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 flex items-center justify-center overflow-hidden">
            {speaker.image && typeof speaker.image === 'object' && speaker.image.url ? (
              <img
                src={speaker.image.url}
                alt={speaker.image.alt || speaker.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-mono text-xl font-bold text-primary">{speaker.initials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-mono font-bold text-xl leading-tight">{speaker.name}</h3>
            <p className="text-primary text-sm font-medium mt-0.5">{speaker.title}</p>
            <p className="text-muted-foreground text-sm">{speaker.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Sulje"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto p-6">
          {speaker.richContent ? (
            <RichText
              data={speaker.richContent}
              enableGutter={false}
              className="text-foreground/80 leading-relaxed [&_a]:text-primary [&_a]:underline"
            />
          ) : speaker.bio ? (
            <p className="text-foreground/80 leading-relaxed">{speaker.bio}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const Speakers: React.FC<Props> = ({ subtitle, title, speakers }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {speakers?.map((speaker, index) => {
            const isClickable = !!(speaker.richContent || speaker.bio)
            return (
              <div
                key={index}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onClick={isClickable ? () => setSelectedSpeaker(speaker) : undefined}
                onKeyDown={
                  isClickable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedSpeaker(speaker)
                        }
                      }
                    : undefined
                }
                className={[
                  'group relative bg-card border border-border rounded-xl p-4 md:p-6 flex flex-col',
                  isClickable
                    ? 'cursor-pointer hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                    : '',
                ].join(' ')}
              >
                {/* Avatar */}
                <div
                  className={[
                    'w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden',
                    isClickable ? 'group-hover:border-primary transition-colors' : '',
                  ].join(' ')}
                >
                  {speaker.image && typeof speaker.image === 'object' && speaker.image.url ? (
                    <img
                      src={speaker.image.url}
                      alt={speaker.image.alt || speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-lg md:text-2xl font-bold text-primary">
                      {speaker.initials}
                    </span>
                  )}
                </div>

                {/* Speaker info */}
                <div className="text-center flex-1">
                  <h3 className="font-mono font-bold text-base md:text-lg mb-1">{speaker.name}</h3>
                  <p className="text-primary text-xs md:text-sm font-medium mb-1">
                    {speaker.title}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm">{speaker.company}</p>
                </div>

                {/* "Read more" indicator */}
                {isClickable && (
                  <div className="mt-4 flex items-center justify-center gap-1 text-xs font-mono text-primary/60 group-hover:text-primary transition-colors">
                    <span>Lue lisää</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                )}

                {/* Decorative corners (only when clickable) */}
                {isClickable && (
                  <>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
      )}
    </section>
  )
}

export default Speakers
