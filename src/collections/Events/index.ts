import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  labels: {
    singular: {
      en: 'Event',
      fi: 'Tapahtuma',
    },
    plural: {
      en: 'Events',
      fi: 'Tapahtumat',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    date: true,
    location: true,
  },
  admin: {
    defaultColumns: ['title', 'date', 'location', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Event Title',
        fi: 'Tapahtuman nimi',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd.M.yyyy' },
        position: 'sidebar',
      },
      label: {
        en: 'Date',
        fi: 'Päivämäärä',
      },
    },
    {
      name: 'time',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
        placeholder: '18:00 - 22:00',
      },
      label: {
        en: 'Time',
        fi: 'Kellonaika',
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
        placeholder: 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
      },
      label: {
        en: 'Location',
        fi: 'Sijainti',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Description',
        fi: 'Kuvaus',
      },
    },
    {
      name: 'schedule',
      type: 'array',
      label: {
        en: 'Schedule',
        fi: 'Aikataulu',
      },
      fields: [
        {
          name: 'time',
          type: 'text',
          localized: true,
          label: {
            en: 'Time',
            fi: 'Aika',
          },
        },
        {
          name: 'event',
          type: 'text',
          localized: true,
          label: {
            en: 'Item',
            fi: 'Ohjelmanumero',
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      label: {
        en: 'Published At',
        fi: 'Julkaistu',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date()
            return value
          },
        ],
      },
    },
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
