import { Clock, Coffee, Mic, Users } from "lucide-react";
import React from "react";

interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  description?: string;
  type: "talk" | "break" | "networking";
  id?: string | null;
}

type Props = {
  subtitle: string;
  title: string;
  schedule: ScheduleItem[];
}

const getIcon = (type: ScheduleItem["type"]) => {
  switch (type) {
    case "talk":
      return Mic;
    case "break":
      return Coffee;
    case "networking":
      return Users;
    default:
      return Clock;
  }
};

const getTypeColor = (type: ScheduleItem["type"]) => {
  switch (type) {
    case "talk":
      return "border-primary/50 bg-primary/5";
    case "break":
      return "border-accent/50 bg-accent/5";
    case "networking":
      return "border-muted-foreground/30 bg-muted/30";
    default:
      return "border-border bg-card";
  }
};

const Schedule: React.FC<Props> = ({
  subtitle,
  title,
  schedule
}) => {
  return (
    <section id="schedule" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            {subtitle}
          </span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mt-4">
            <span dangerouslySetInnerHTML={{ __html: title?.replace('aikataulu', '<span class="text-primary">aikataulu</span>') || '' }} />
          </h2>
        </div>

        {/* Schedule timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[60px] md:left-[85px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />

            {schedule?.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <div key={index} className="relative flex gap-4 md:gap-6 mb-6 last:mb-0">
                  {/* Time */}
                  <div className="w-14 md:w-20 flex-shrink-0 text-right">
                    <span className="font-mono text-sm text-muted-foreground">
                      {item.time}
                    </span>
                  </div>

                  {/* Icon dot */}
                  <div className="relative z-10 w-8 h-8 flex-shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 p-4 rounded-lg border ${getTypeColor(item.type)} transition-all hover:scale-[1.02]`}
                  >
                    <h3 className="font-mono font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    {item.speaker && (
                      <p className="text-primary text-sm font-medium mb-2">
                        {item.speaker}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Schedule;
