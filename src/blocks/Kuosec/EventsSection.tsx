import { MapPin, Clock, CalendarDays } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Event } from '@/payload-types'

export interface EventsSectionBlock {
  blockType: 'eventsSection'
  sourceMode?: 'next' | 'specific' | null
  eventRef?: number | Event | null
  locale?: string
}

const formatDate = (isoDate: string, locale?: string): string => {
  const date = new Date(isoDate)
  return date.toLocaleDateString(locale?.startsWith('fi') ? 'fi-FI' : 'en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}

const EventsSection = async (props: EventsSectionBlock) => {
  const { sourceMode = 'next', eventRef, locale } = props

  const isFi = locale?.startsWith('fi')
  const t = {
    subtitle: isFi ? 'TAPAHTUMAT' : '// EVENTS',
    title: isFi ? 'Tulevat tapahtumat' : 'Upcoming Events',
    scheduleHeader: '// SCHEDULE',
    scheduleAnnounced: isFi
      ? 'Aikataulu julkaistaan lähempänä tapahtumaa.'
      : 'Schedule will be announced closer to the event.',
    noEvent: isFi ? 'Ei tulevia tapahtumia.' : 'No upcoming events at the moment.',
    allEvents: isFi ? 'Kaikki tapahtumat' : 'All Events',
  }

  const payload = await getPayload({ config: configPromise })

  let event: Event | null = null

  if (sourceMode === 'specific') {
    if (typeof eventRef === 'object' && eventRef !== null) {
      event = eventRef
    } else if (typeof eventRef === 'number') {
      const result = await payload.findByID({
        collection: 'events',
        id: eventRef,
        locale: locale as any,
        overrideAccess: false,
      })
      event = result ?? null
    }
  } else {
    // next: fetch the nearest upcoming event
    const now = new Date().toISOString()
    const result = await payload.find({
      collection: 'events',
      where: { date: { greater_than_equal: now } },
      sort: 'date',
      limit: 1,
      locale: locale as any,
      overrideAccess: false,
    })
    event = result.docs?.[0] ?? null
  }

  const hasSchedule = Array.isArray(event?.schedule) && event.schedule.length > 0

  return (
    <section id="events" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm">{t.subtitle}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {t.title}
          </h2>
        </div>

        {event ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Event header */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-border">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-6 text-sm">
                  {event.date && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="text-primary" size={18} />
                      <span>{formatDate(event.date, locale)}</span>
                    </div>
                  )}
                  {event.time && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="text-primary" size={18} />
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="text-primary" size={18} />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule */}
              <div className="p-6">
                <h4 className="font-mono text-primary text-sm mb-4">{t.scheduleHeader}</h4>
                {hasSchedule ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground font-normal">
                            TIME
                          </th>
                          <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground font-normal">
                            EVENT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {event.schedule!.map((item, index) => (
                          <tr
                            key={item.id ?? `${item.time ?? 'time'}-${index}`}
                            className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                          >
                            <td className="py-3 px-4 font-mono text-primary whitespace-nowrap">
                              {item.time}
                            </td>
                            <td className="py-3 px-4 text-foreground">{item.event}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{t.scheduleAnnounced}</p>
                )}
              </div>

              {/* All events link */}
              <div className="p-6 border-t border-border bg-card/60">
                <a
                  href={`/${locale}/events`}
                  className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-md font-semibold hover:bg-primary/10 transition-all"
                >
                  {t.allEvents}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">{t.noEvent}</p>
            <div className="mt-6">
              <a
                href={`/${locale}/events`}
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-md font-semibold hover:bg-primary/10 transition-all"
              >
                {t.allEvents}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default EventsSection
