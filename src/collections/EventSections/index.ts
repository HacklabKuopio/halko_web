import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'

export const EventSections: CollectionConfig = {
  slug: 'eventSections',
  labels: {
    singular: {
      en: 'Event Section',
      fi: 'Tapahtumaosio',
    },
    plural: {
      en: 'Event Sections',
      fi: 'Tapahtumaosiot',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    eventTitle: true,
    eventDate: true,
  },
  admin: {
    defaultColumns: ['name', 'eventDate', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Internal Name',
        fi: 'Sisainen nimi',
      },
    },
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
