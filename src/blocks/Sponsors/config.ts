import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Sponsors: Block = {
  slug: 'sponsors',
  interfaceName: 'SponsorsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
      required: false,
    },
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro',
      required: false,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tiers',
          label: 'Tiers to include',
          type: 'select',
          hasMany: true,
          required: false,
          defaultValue: [],
          options: [
            { label: 'Platinum', value: 'platinum' },
            { label: 'Gold', value: 'gold' },
            { label: 'Silver', value: 'silver' },
            { label: 'Bronze', value: 'bronze' },
            { label: 'Community / Partner', value: 'community' },
          ],
        },
        {
          name: 'onlyFeatured',
          label: 'Only featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'onlyCurrentlyActive',
          label: 'Only currently active (by dates)',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'limit',
          label: 'Limit',
          type: 'number',
          min: 1,
          max: 200,
          defaultValue: 50,
        },
      ],
    },
  ],
  labels: {
    plural: 'Sponsors sections',
    singular: 'Sponsors section',
  },
}
