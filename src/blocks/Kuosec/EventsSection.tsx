import { MapPin, Clock, CalendarDays } from 'lucide-react'
import { CMSLink, type CMSLinkType } from '@/components/Link'
import type { EventSection } from '@/payload-types'

type ScheduleItem = {
  time?: string | null
  event?: string | null
  id?: string | null
}

type EventsLinkData = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: CMSLinkType['reference']
  url?: string | null
  label?: string | null

  appearance?: ('default' | 'outline') | null
}

type EventsSectionContent = {
  subtitle?: string | null
  title?: string | null
  eventTitle?: string | null
  eventDate?: string | null
  eventTime?: string | null
  eventLocation?: string | null
  all_events?: EventsLinkData | null
  schedule?: ScheduleItem[] | null
}

export interface EventsSectionBlock {
  blockType: 'eventsSection'
  sourceMode?: 'inline' | 'reusable' | null
  eventSectionRef?: number | string | EventSection | null
  subtitle?: string | null
  title?: string | null
  eventTitle?: string | null
  eventDate?: string | null
  eventTime?: string | null
  eventLocation?: string | null
  all_events?: EventsLinkData | null
  schedule?: ScheduleItem[] | null
  locale?: string
}

const isEventSectionDocument = (
  value: EventsSectionBlock['eventSectionRef'],
): value is EventSection => {
  return typeof value === 'object' && value !== null
}

const toCMSLinkProps = (value: EventsLinkData | null | undefined): CMSLinkType | null => {
  if (!value) return null

  const hasTarget = Boolean(value.url) || Boolean(value.reference)
  const hasLabel = typeof value.label === 'string' && value.label.trim().length > 0

  if (!hasTarget || !hasLabel) return null

  return {
    type: value.type,
    newTab: value.newTab,
    reference: value.reference,
    url: value.url,
    label: value.label,
    appearance: 'inline',
  }
}

const EventsSection = (props: EventsSectionBlock) => {
  const {
    sourceMode,
    eventSectionRef,
    subtitle,
    title,
    eventTitle,
    eventDate,
    eventTime,
    eventLocation,
    schedule,
    all_events,
    locale,
  } = props

  const inlineContent: EventsSectionContent = {
    subtitle,
    title,
    eventTitle,
    eventDate,
    eventTime,
    eventLocation,
    all_events,
    schedule,
  }

  const reusableContent: EventsSectionContent | null =
    sourceMode === 'reusable' && isEventSectionDocument(eventSectionRef)
      ? {
          subtitle: eventSectionRef.subtitle,
          title: eventSectionRef.title,
          eventTitle: eventSectionRef.eventTitle,
          eventDate: eventSectionRef.eventDate,
          eventTime: eventSectionRef.eventTime,
          eventLocation: eventSectionRef.eventLocation,
          all_events: eventSectionRef.all_events,
          schedule: eventSectionRef.schedule,
        }
      : null

  const content = reusableContent ?? inlineContent
  const allEventsLinkProps = toCMSLinkProps(content.all_events)
  const hasSchedule = Array.isArray(content.schedule) && content.schedule.length > 0
  const scheduleFallbackText = locale?.startsWith('fi')
    ? 'Aikataulu julkaistaan lähempänä tapahtumaa.'
    : 'Schedule will be announced closer to the event.'

  return (
    <section id="events" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm">{content.subtitle}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {content.title}
          </h2>
        </div>

        {/* Event card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Event header */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-border">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {content.eventTitle}
              </h3>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="text-primary" size={18} />
                  <span>{content.eventDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="text-primary" size={18} />
                  <span>{content.eventTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="text-primary" size={18} />
                  <span>{content.eventLocation}</span>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="p-6">
              <h4 className="font-mono text-primary text-sm mb-4">// SCHEDULE</h4>

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
                      {content.schedule?.map((item, index) => (
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
                <p className="text-muted-foreground">{scheduleFallbackText}</p>
              )}
            </div>
            {allEventsLinkProps && (
              <div className="p-6 border-t border-border bg-card/60">
                <CMSLink
                  {...allEventsLinkProps}
                  className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-md font-semibold hover:bg-primary/10 transition-all"
                ></CMSLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
