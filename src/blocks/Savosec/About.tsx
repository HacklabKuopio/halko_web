import { Shield, Users, Wifi, Terminal } from "lucide-react";
import React from 'react';

type Props = {
  subtitle: string;
  title: string;
  description: string;
  features: {
    icon: 'Shield' | 'Users' | 'Wifi' | 'Terminal';
    title: string;
    description: string;
    id?: string | null;
  }[];
}

const iconMap = {
  Shield,
  Users,
  Wifi,
  Terminal,
};

const About: React.FC<Props> = ({
  subtitle,
  title,
  description,
  features,
}) => {
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
              {/* Splitting logic or just render title.
                  If user types "Mitä on SavoSec?", we want "SavoSec" colored.
                  Since we can't easily parse rich text here without a rich text field,
                  we will just render the title as is or provide simple highlight for "SavoSec".
                  Let's try to highlight "SavoSec" if present.
               */}
               <span dangerouslySetInnerHTML={{ __html: title?.replace('SavoSec', '<span class="text-primary">SavoSec</span>') || '' }} />
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
              const Icon = feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : Shield;

              return (
              <div
                key={index}
                className="group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;
