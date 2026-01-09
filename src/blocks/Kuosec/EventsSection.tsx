import { MapPin, Clock, CalendarDays } from 'lucide-react';
import { EventsSectionBlock } from '@/payload-types';

const EventsSection = (props: EventsSectionBlock) => {
  const { subtitle, title, eventTitle, eventDate, eventTime, eventLocation, schedule } = props;

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
                        <td className="py-3 px-4 text-foreground">
                          {item.event}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
