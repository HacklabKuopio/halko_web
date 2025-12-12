import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { EMPTY_EDITOR_STATE, normalizeRichTextValue } from '@/utilities/lexical'

export const Sponsors: CollectionConfig<'sponsors'> = {
  slug: 'sponsors',
  labels: {
    singular: {
      en: 'Sponsor',
      fi: 'Sponsori',
    },
    plural: {
      en: 'Sponsors',
      fi: 'Sponsorit',
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
    website: true,
    tier: true,
  },

  admin: {
    defaultColumns: ['name', 'tier', 'website', 'updatedAt'],
    livePreview: {
      url: ({ req }) =>
        generatePreviewPath({
          slug: '',
          collection: 'sponsors',
          req,
        }),
    },
    preview: (_data, { req }) =>
      generatePreviewPath({
        slug: '',
        collection: 'sponsors',
        req,
      }),
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Name',
        fi: 'Nimi',
      },
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Content',
            fi: 'Sisältö',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'lightLogo',
                  label: {
                    en: 'Logo (Light theme)',
                    fi: 'Logo (Vaalea teema)',
                  },
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'darkLogo',
                  label: {
                    en: 'Logo (Dark theme)',
                    fi: 'Logo (Tumma teema)',
                  },
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'about',
              label: {
                en: 'About / Info',
                fi: 'Tietoa',
              },
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
              defaultValue: EMPTY_EDITOR_STATE as any,
              hooks: {
                beforeValidate: [({ value }) => normalizeRichTextValue(value)],
              },
            },
          ],
        },

        {
          label: {
            en: 'Meta',
            fi: 'Meta',
          },
          fields: [
            {
              name: 'website',
              label: {
                en: 'Website URL',
                fi: 'Verkkosivun osoite',
              },
              type: 'text',
              admin: {
                position: 'sidebar',
                placeholder: 'https://example.com',
              },
              validate: (value: unknown) => {
                if (!value) return true
                if (typeof value !== 'string') return 'Enter a valid URL (https://...)'
                try {
                  const u = new URL(value)
                  return u.protocol === 'http:' || u.protocol === 'https:'
                    ? true
                    : 'Enter a valid URL (https://...)'
                } catch {
                  return 'Enter a valid URL (https://...)'
                }
              },
            },
            {
              name: 'tier',
              label: {
                en: 'Tier',
                fi: 'Taso',
              },
              type: 'select',
              required: true,
              defaultValue: 'community',
              options: [
                {
                  label: {
                    en: 'Platinum',
                    fi: 'Platina',
                  },
                  value: 'platinum',
                },
                {
                  label: {
                    en: 'Gold',
                    fi: 'Kulta',
                  },
                  value: 'gold',
                },
                {
                  label: {
                    en: 'Silver',
                    fi: 'Hopea',
                  },
                  value: 'silver',
                },
                {
                  label: {
                    en: 'Bronze',
                    fi: 'Pronssi',
                  },
                  value: 'bronze',
                },
                {
                  label: {
                    en: 'Community / Partner',
                    fi: 'Yhteisö / Kumppani',
                  },
                  value: 'community',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'isFeatured',
                  label: {
                    en: 'Featured',
                    fi: 'Nosto',
                  },
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'order',
                  label: {
                    en: 'Sort Order',
                    fi: 'Järjestys',
                  },
                  type: 'number',
                  defaultValue: 0,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  label: {
                    en: 'Start date',
                    fi: 'Aloituspäivä',
                  },
                  type: 'date',
                },
                {
                  name: 'endDate',
                  label: {
                    en: 'End date',
                    fi: 'Lopetuspäivä',
                  },
                  type: 'date',
                },
              ],
            },
          ],
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
