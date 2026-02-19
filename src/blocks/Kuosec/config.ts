import type { Block } from 'payload'
import { link } from '@/fields/link'

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSectionBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: '// ABOUT US',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Who We Are',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.',
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
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'cfpTitle',
      type: 'text',
      localized: true,
      defaultValue: 'KuoSec Meetups - Call for Papers',
    },
    {
      name: 'cfpDescription',
      type: 'textarea',
      localized: true,
      defaultValue:
        'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!',
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
      localized: true,
      defaultValue: '// CONTACT',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
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
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'sponsorsSubtitle',
      type: 'text',
      localized: true,
      defaultValue: '// SPONSORS',
    },
    {
      name: 'sponsorsTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Sponsors',
    },
    {
      name: 'sponsorsText',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Interested in sponsoring our meetups? We're always looking for partners who share our passion for cybersecurity.",
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
      localized: true,
      defaultValue: '// EVENTS',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'eventTitle',
      type: 'text',
      localized: true,
      defaultValue: 'KuoSec December Meetup',
    },
    {
      name: 'eventDate',
      type: 'text',
      localized: true,
      defaultValue: '3.12.2025',
    },
    {
      name: 'eventTime',
      type: 'text',
      localized: true,
      defaultValue: '18:00 - 02:00',
    },
    {
      name: 'eventLocation',
      type: 'text',
      localized: true,
      defaultValue: 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
    },
    {
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'time',
          type: 'text',
          localized: true,
        },
        {
          name: 'event',
          type: 'text',
          localized: true,
        },
      ],
    },
    link({
      overrides: {
        name: 'all_events',
        label: {
          en: 'All Events',
          fi: 'Kaikki tapahtumat',
        },
      },
    }),
  ],
}

export const MembershipSectionBlock: Block = {
  slug: 'membershipSection',
  interfaceName: 'MembershipSectionBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: '// MEMBERSHIP',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Liity jäseneksi',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.',
    },
    {
      name: 'membershipTypes',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'price',
          type: 'text',
          localized: true,
        },
        {
          name: 'period',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'paymentRecipient',
      type: 'text',
      localized: true,
      defaultValue: 'KuoSec ry',
    },
    {
      name: 'paymentAccount',
      type: 'text',
      localized: true,
      defaultValue: 'FI51 7140 1420 0025 79',
    },
    {
      name: 'paymentReference',
      type: 'text',
      localized: true,
      defaultValue: '4242',
    },
    {
      name: 'paymentInstruction',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!',
    },
    link({
      overrides: {
        name: 'joinLink',
        label: {
          en: 'Join Link',
          fi: 'Liittymislinkki',
        },
      },
    }),
  ],
}

export const HeroSectionBlock: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'KuoSec',
    },
    {
      name: 'highlight',
      type: 'text',
      localized: true,
      defaultValue: 'ry',
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: 'Infosec Community',
    },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Kuopio's premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.",
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    link({
      overrides: {
        name: 'primaryLink',
      },
    }),
    link({
      overrides: {
        name: 'contactLink',
      },
    }),
  ],
}
