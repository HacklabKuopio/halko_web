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
    { name: 'name', type: 'text', required: true },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'lightLogo',
                  label: 'Logo (Light theme)',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'darkLogo',
                  label: 'Logo (Dark theme)',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'about',
              label: 'About / Info',
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
          label: 'Meta',
          fields: [
            {
              name: 'website',
              label: 'Website URL',
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
              label: 'Tier',
              type: 'select',
              required: true,
              defaultValue: 'community',
              options: [
                { label: 'Platinum', value: 'platinum' },
                { label: 'Gold', value: 'gold' },
                { label: 'Silver', value: 'silver' },
                { label: 'Bronze', value: 'bronze' },
                { label: 'Community / Partner', value: 'community' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'isFeatured', label: 'Featured', type: 'checkbox', defaultValue: false },
                { name: 'order', label: 'Sort Order', type: 'number', defaultValue: 0 },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'startDate', label: 'Start date', type: 'date' },
                { name: 'endDate', label: 'End date', type: 'date' },
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
