import { Mail, Linkedin, MessageSquare, ExternalLink } from 'lucide-react';
import { CMSLink } from '@/components/Link';

export interface ContactSectionBlock {
  blockType: 'contactSection'
  subtitle?: string | null
  title?: string | null
  links?:
    | {
        icon?: ('MessageSquare' | 'Mail' | 'Linkedin') | null
        label?: string | null
        value?: string | null
        href?: string | null
        id?: string | null
      }[]
    | null
  sponsorsSubtitle?: string | null
  sponsorsTitle?: string | null
  sponsorsText?: string | null
  sponsorLink?: {
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
  Mail,
  Linkedin,
  MessageSquare,
};

const ContactSection = (props: ContactSectionBlock) => {
  const { subtitle, title, links, sponsorsSubtitle, sponsorsTitle, sponsorsText, sponsorLink } = props;

  const hasSponsorLink = sponsorLink && (sponsorLink.url || sponsorLink.reference);
  const sponsorLinkProps = hasSponsorLink ? sponsorLink : {
    type: 'custom',
    url: 'mailto:info@kuosec.fi',
    label: 'Become a Sponsor',
    appearance: 'default' // Or inline if we want to customize simpler
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact */}
          <div>
            <span className="text-primary font-mono text-sm">{subtitle}</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-2 mb-8">
              {title}
            </h2>

            <div className="space-y-4">
              {links?.map((link) => {
                const Icon = link.icon && iconMap[link.icon as keyof typeof iconMap] ? iconMap[link.icon as keyof typeof iconMap] : MessageSquare;
                return (
                <a
                  key={link.id}
                  href={link.href || '#'}
                  target={link.href?.startsWith('http') ? '_blank' : undefined}
                  rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 bg-card border border-border p-4 rounded-lg hover:border-primary/50 transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">{link.label}</div>
                    <div className="text-foreground font-mono">{link.value}</div>
                  </div>
                  <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={18} />
                </a>
              )})}
            </div>
          </div>

          {/* Sponsors */}
          <div id="sponsors">
            <span className="text-primary font-mono text-sm">{sponsorsSubtitle}</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-2 mb-8">
              {sponsorsTitle}
            </h2>

            <div className="bg-card border border-border p-8 rounded-lg text-center">
              <p className="text-muted-foreground mb-6">
                {sponsorsText}
              </p>
              <CMSLink
                {...sponsorLinkProps as any}
                appearance="inline"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary/10 transition-all"
              >
                  <Mail size={18} />
              </CMSLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
