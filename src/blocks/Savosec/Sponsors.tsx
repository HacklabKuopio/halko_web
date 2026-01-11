import { CMSLink } from "@/components/Link";
import type { Page } from "@/payload-types";
import React from 'react';

interface Sponsor {
  name: string;
  url: string;
  id?: string | null;
}

type Props = {
  subtitle: string;
  title: string;
  backgroundTitle?: string;
  sponsors: Sponsor[];
  becomeSponsorText: string;
  contactLink: {
     type?: ('reference' | 'custom') | null
     newTab?: boolean | null
     reference?:
       | ({
       relationTo: 'pages'
       value: number | string | Page
     } | null)
       | ({
       relationTo: 'posts'
       value: number | string
     } | null)
     url?: string | null
     label?: string | null
   }
}

const Sponsors: React.FC<Props> = ({
  subtitle,
  title,
  sponsors,
  becomeSponsorText,
  contactLink
}) => {
  return (
    <section id="sponsors" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            {subtitle}
          </span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mt-4">
             <span dangerouslySetInnerHTML={{ __html: title?.replace('mahdollistajat', '<span class="text-primary">mahdollistajat</span>') || '' }} />
          </h2>
        </div>

        {/* Sponsors grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
          {sponsors?.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <span className="font-mono text-xl text-muted-foreground group-hover:text-primary transition-colors">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

        {/* Become sponsor CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            {becomeSponsorText}
          </p>
          <CMSLink
            {...contactLink}
            label={null}
            className="inline-flex items-center gap-2 font-mono text-primary hover:text-primary/80 transition-colors"
          >
             {/* CMSLink handles children/label, but if we want arrow we might need to handle it.
                 Wrapper can't pass children easily if label is used from props.
                 But CMSLink renders label if children is null?
                 Actually CMSLink implementation:
                 const { children, label ... }
                 return <Link ...>{children || label || ...}</Link>
                 So passing children overrides label.
              */}
              {contactLink?.label} →
          </CMSLink>
        </div>
      </div>
    </section>
  );
};


export default Sponsors;
