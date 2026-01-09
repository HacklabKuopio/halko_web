import type { Block } from 'payload'
import { link } from '@/fields/link'

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSectionBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '// ABOUT US',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Who We Are',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Shield', value: 'Shield' },
            { label: 'Users', value: 'Users' },
            { label: 'Calendar', value: 'Calendar' },
            { label: 'Terminal', value: 'Terminal' },
          ],
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'cfpTitle',
      type: 'text',
      defaultValue: 'KuoSec Meetups - Call for Papers',
    },
    {
      name: 'cfpDescription',
      type: 'textarea',
      defaultValue: 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!',
    },
    link({
      overrides: {
        name: 'cfpLink',
      },
    }),
  ],
}

export const ContactSectionBlock: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '// CONTACT',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Get in Touch',
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'MessageSquare', value: 'MessageSquare' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Linkedin', value: 'Linkedin' },
          ],
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'sponsorsSubtitle',
      type: 'text',
      defaultValue: '// SPONSORS',
    },
    {
      name: 'sponsorsTitle',
      type: 'text',
      defaultValue: 'Sponsors',
    },
    {
      name: 'sponsorsText',
      type: 'textarea',
      defaultValue: 'Interested in sponsoring our meetups? We\'re always looking for partners who share our passion for cybersecurity.',
    },
    link({
      overrides: {
        name: 'sponsorLink',
      },
    }),
  ],
}

export const EventsSectionBlock: Block = {
  slug: 'eventsSection',
  interfaceName: 'EventsSectionBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '// EVENTS',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'eventTitle',
      type: 'text',
      defaultValue: 'KuoSec December Meetup',
    },
    {
      name: 'eventDate',
      type: 'text',
      defaultValue: '3.12.2025',
    },
    {
      name: 'eventTime',
      type: 'text',
      defaultValue: '18:00 - 02:00',
    },
    {
      name: 'eventLocation',
      type: 'text',
      defaultValue: 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
    },
    {
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'time',
          type: 'text',
        },
        {
          name: 'event',
          type: 'text',
        },
      ],
    },
  ],
}

export const MembershipSectionBlock: Block = {
  slug: 'membershipSection',
  interfaceName: 'MembershipSectionBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '// MEMBERSHIP',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Liity jäseneksi',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.',
    },
    {
      name: 'membershipTypes',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'period',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'paymentRecipient',
      type: 'text',
      defaultValue: 'KuoSec ry',
    },
    {
      name: 'paymentAccount',
      type: 'text',
      defaultValue: 'FI51 7140 1420 0025 79',
    },
    {
      name: 'paymentReference',
      type: 'text',
      defaultValue: '4242',
    },
    {
        name: 'paymentInstruction',
        type: 'textarea',
        defaultValue: 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!',
    },
    link({
        overrides: {
            name: 'joinLink',
            label: {
                en: 'Join Link',
                fi: 'Liittymislinkki',
            }
        }
    }),
    link({
        overrides: {
            name: 'infoLink',
            label: {
                en: 'Info Link',
                fi: 'Lisätietolinkki',
            }
        }
    })
  ],
}

export const HeroSectionBlock: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
      {
          name: 'title',
          type: 'text',
          defaultValue: 'KuoSec',
      },
      {
          name: 'highlight',
          type: 'text',
          defaultValue: 'ry',
      },
      {
          name: 'subtitle',
          type: 'text',
          defaultValue: 'Infosec Community',
      },
      {
          name: 'tagline',
          type: 'textarea',
          defaultValue: 'Kuopio\'s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.',
      },
      {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
      },
      link({
          overrides: {
              name: 'primaryLink',
          }
      }),
       link({
          overrides: {
              name: 'contactLink',
          }
      }),
  ]
}
