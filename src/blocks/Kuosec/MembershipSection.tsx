import { Users, CreditCard } from 'lucide-react';
import { CMSLink } from '@/components/Link';

export interface MembershipSectionBlock {
  blockType: 'membershipSection'
  subtitle?: string | null
  title?: string | null
  description?: string | null
  membershipTypes?:
    | {
        title?: string | null
        price?: string | null
        period?: string | null
        description?: string | null
        id?: string | null
      }[]
    | null
  paymentRecipient?: string | null
  paymentAccount?: string | null
  paymentReference?: string | null
  paymentInstruction?: string | null
  joinLink?: {
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
  infoLink?: {
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

const MembershipSection = (props: MembershipSectionBlock) => {
  const { subtitle, title, description, membershipTypes, paymentRecipient, paymentAccount, paymentReference, paymentInstruction, joinLink, infoLink } = props;

  const hasJoinLink = joinLink && (joinLink.url || joinLink.reference);
  const joinLinkProps = hasJoinLink ? joinLink : {
    type: 'custom',
    url: 'https://forms.office.com/pages/responsepage.aspx?id=ZrCpN1oyvE2aMsyhFsFtgMc00WDfrFtDgsFyAFzgoalUQVpZRTdUMkdVS1laQTdZNDNBSkswS1VVMyQlQCN0PWcu&route=shorturl',
    label: 'Täytä jäsenhakemus',
    newTab: true,
    appearance: 'default'
  };

  return (
    <section id="membership" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-mono text-sm">{subtitle}</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-2 mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Membership Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {membershipTypes?.map((type) => (
            <div
              key={type.id}
              className="bg-card border border-border p-6 rounded-lg hover:border-primary/50 transition-all text-center"
            >
              <Users className="text-primary mx-auto mb-4" size={32} />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {type.title}
              </h3>
              <div className="text-3xl font-bold text-primary mb-1">
                {type.price}
                <span className="text-sm text-muted-foreground font-normal">/{type.period}</span>
              </div>
              <p className="text-muted-foreground text-sm">{type.description}</p>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="bg-card border border-border p-8 rounded-lg max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-primary" size={24} />
            <h3 className="font-display text-xl font-bold text-foreground">
              Maksutiedot
            </h3>
          </div>

          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Saaja:</span>
              <span className="text-foreground">{paymentRecipient}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Tilinumero:</span>
              <span className="text-foreground">{paymentAccount}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Viite:</span>
              <span className="text-primary font-bold">{paymentReference}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mt-6 mb-4">
            {paymentInstruction}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <CMSLink
              {...joinLinkProps as any}
              appearance="inline"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:glow transition-all"
            >
              <Users size={18} />
            </CMSLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
