import { Shield, Users, Calendar, Terminal } from 'lucide-react';
import { CMSLink } from '@/components/Link';

// Define the type locally since it's missing from payload-types
export interface AboutSectionBlock {
  blockType: 'aboutSection'
  subtitle?: string | null
  title?: string | null
  description?: string | null
  features?:
    | {
        icon?: ('Shield' | 'Users' | 'Calendar' | 'Terminal') | null
        title?: string | null
        description?: string | null
        id?: string | null
      }[]
    | null
  cfpTitle?: string | null
  cfpDescription?: string | null
  cfpLink?: {
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
    appearance?: ('default' | 'inline' | 'button') | null
  }
}

const iconMap = {
  Shield,
  Users,
  Calendar,
  Terminal,
};

const AboutSection = (props: AboutSectionBlock) => {
  const { title, subtitle, description, features, cfpTitle, cfpDescription, cfpLink } = props;

  const hasCfpLink = cfpLink && (cfpLink.url || cfpLink.reference);
  const cfpLinkProps = hasCfpLink ? cfpLink : {
    type: 'custom',
    url: 'mailto:info@kuosec.fi',
    label: 'Apply to Speak',
    appearance: 'default'
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm">{subtitle}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features?.map((feature, index) => {
             const Icon = feature.icon && iconMap[feature.icon as keyof typeof iconMap] ? iconMap[feature.icon as keyof typeof iconMap] : Shield;
             return (
            <div
              key={feature.id}
              className="group bg-card border border-border p-6 rounded-lg hover:border-primary/50 hover:glow transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          )})}
        </div>

        {/* Call for Papers banner */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-lg p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            {cfpTitle}
          </h3>
          <p className="text-muted-foreground mb-4">
            {cfpDescription}
          </p>
          <CMSLink
            {...cfpLinkProps as any}
            appearance="inline"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:glow transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
