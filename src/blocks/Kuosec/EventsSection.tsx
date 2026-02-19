import { MapPin, Clock, CalendarDays } from 'lucide-react'
import { CMSLink } from '@/components/Link'

export interface EventsSectionBlock {
  blockType: 'eventsSection'
  subtitle?: string | null
  title?: string | null
  eventTitle?: string | null
  eventDate?: string | null
  eventTime?: string | null
  eventLocation?: string | null
  all_events?: {
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
    appearance?: ('default' | 'outline') | null
  }
  schedule?:
    | {
        time?: string | null
        event?: string | null
        id?: string | null
      }[]
    | null
  locale?: string
}

const EventsSection = (props: EventsSectionBlock) => {
  const {
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

  const hasAllEventsLink =
    all_events &&
    (all_events.url || all_events.reference) &&
    typeof all_events.label === 'string' &&
    all_events.label.trim().length > 0
  const allEventsLinkProps = hasAllEventsLink ? all_events : null
  const hasSchedule = Array.isArray(schedule) && schedule.length > 0
  const scheduleFallbackText = locale?.startsWith('fi')
    ? 'Aikataulu julkaistaan lähempänä tapahtumaa.'
    : 'Schedule will be announced closer to the event.'

  return (
    <section id="events" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm">{subtitle}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {title}
          </h2>
        </div>

        {/* Event card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Event header */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-border">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {eventTitle}
              </h3>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="text-primary" size={18} />
                  <span>{eventDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="text-primary" size={18} />
                  <span>{eventTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="text-primary" size={18} />
                  <span>{eventLocation}</span>
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
                      {schedule?.map((item, index) => (
                        <tr
                          key={index}
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
                  {...(allEventsLinkProps as any)}
                  appearance="inline"
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
