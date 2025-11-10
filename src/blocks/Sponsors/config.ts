import type {Block} from 'payload'

import {FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor,} from '@payloadcms/richtext-lexical'
import {EMPTY_EDITOR_STATE, normalizeRichTextValue} from '@/utilities/lexical'

export const Sponsors: Block = {
  slug: 'sponsors',
  interfaceName: 'SponsorsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
    },
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro',
      localized: true,
      defaultValue: EMPTY_EDITOR_STATE as any,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      hooks: {
        beforeValidate: [({ value }) => normalizeRichTextValue(value)],
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tiers',
          label: 'Tiers to include',
          type: 'select',
          hasMany: true,
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
