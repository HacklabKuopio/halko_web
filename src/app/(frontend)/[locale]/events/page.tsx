import { notFound } from 'next/navigation'
import { getPayload, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { MapPin, Clock, CalendarDays } from 'lucide-react'
import type { Metadata } from 'next'
import GridBackground from '@/blocks/Kuosec/GridBackground'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

const formatDate = (isoDate: string, locale?: string): string => {
  const date = new Date(isoDate)
  return date.toLocaleDateString(locale?.startsWith('fi') ? 'fi-FI' : 'en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}

export default async function EventsPage({ params }: Args) {
  if (process.env.HOSTNAME && process.env.HOSTNAME !== 'kuosec.fi') {
    notFound()
  }

  const { locale } = await params
  const isFi = locale?.startsWith('fi')

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  const [upcomingResult, pastResult] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { date: { greater_than_equal: now } },
      sort: 'date',
      limit: 100,
      locale,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'events',
      where: { date: { less_than: now } },
      sort: '-date',
      limit: 100,
      locale,
      overrideAccess: false,
    }),
  ])

  const upcoming = upcomingResult.docs
  const past = pastResult.docs

  const t = {
    pageTitle: isFi ? 'Tapahtumat' : 'Events',
    pageSubtitle: '// EVENTS',
    upcomingTitle: isFi ? 'Tulevat tapahtumat' : 'Upcoming Events',
    pastTitle: isFi ? 'Menneet tapahtumat' : 'Past Events',
    noUpcoming: isFi ? 'Ei tulevia tapahtumia.' : 'No upcoming events at the moment.',
    noPast: isFi ? 'Ei menneitä tapahtumia.' : 'No past events yet.',
    schedule: '// SCHEDULE',
    scheduleAnnounced: isFi
      ? 'Aikataulu julkaistaan lähempänä tapahtumaa.'
      : 'Schedule will be announced closer to the event.',
    timeHeader: 'TIME',
    eventHeader: 'EVENT',
  }

  return (
    <article className="pt-16 pb-24 relative">
      <GridBackground />

      <div className="container mx-auto px-4 py-24">
        {/* Page header */}
        <div className="text-center mb-20">
          <span className="text-primary font-mono text-sm">{t.pageSubtitle}</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mt-2">
            {t.pageTitle}
          </h1>
        </div>

        {/* Upcoming events */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 border-b border-border pb-4">
            {t.upcomingTitle}
          </h2>
          {upcoming.length === 0 ? (
            <p className="text-muted-foreground">{t.noUpcoming}</p>
          ) : (
            <div className="space-y-8">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} t={t} />
              ))}
            </div>
          )}
        </section>

        {/* Past events */}
        {past.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-muted-foreground mb-8 border-b border-border pb-4">
              {t.pastTitle}
            </h2>
            <div className="space-y-8 opacity-70">
              {past.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} t={t} past />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

type EventDoc = {
  id: number
  title?: string | null
  date?: string | null
  time?: string | null
  location?: string | null
  description?: string | null
  schedule?:
    | {
        time?: string | null
        event?: string | null
        id?: string | null
      }[]
    | null
}

function EventCard({
  event,
  locale,
  t,
  past = false,
}: {
  event: EventDoc
  locale: string
  t: Record<string, string>
  past?: boolean
}) {
  const hasSchedule = Array.isArray(event.schedule) && event.schedule.length > 0

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden max-w-4xl">
      <div
        className={`p-6 border-b border-border ${past ? 'bg-muted/30' : 'bg-gradient-to-r from-primary/20 to-primary/5'}`}
      >
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-6 text-sm">
          {event.date && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="text-primary" size={16} />
              <span>{formatDate(event.date, locale)}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="text-primary" size={16} />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="text-primary" size={16} />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>

      {event.description && (
        <div className="px-6 pt-4 pb-2">
          <p className="text-muted-foreground text-sm">{event.description}</p>
        </div>
      )}

      <div className="p-6">
        <h4 className="font-mono text-primary text-sm mb-4">{t.schedule}</h4>
        {hasSchedule ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground font-normal">
                    {t.timeHeader}
                  </th>
                  <th className="text-left py-3 px-4 font-mono text-sm text-muted-foreground font-normal">
                    {t.eventHeader}
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
          <p className="text-muted-foreground text-sm">{t.scheduleAnnounced}</p>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const isFi = locale?.startsWith('fi')
  return {
    title: isFi ? 'Tapahtumat | KuoSec' : 'Events | KuoSec',
    description: isFi
      ? 'KuoSecin tulevat ja menneet tapahtumat.'
      : 'Upcoming and past KuoSec events.',
  }
}
