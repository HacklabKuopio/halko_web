import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import type { LexicalEditorProps } from '@payloadcms/richtext-lexical'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

type RichTextEditorFeatureArgs = Parameters<
  Extract<NonNullable<LexicalEditorProps['features']>, (...args: never[]) => unknown>
>[0]

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Brand/logo and optional short rich text
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      localized: false,
      label: 'Logo',
      admin: {
        description: 'Image shown on the left of the footer',
      },
    },
    {
      name: 'about',
      type: 'richText',
      label: 'About text',
      admin: {
        description: 'Optional short text shown under the logo',
      },
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }: RichTextEditorFeatureArgs) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },

    // Columns similar to Flowbite (Resources / Follow us / Legal)
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              label: 'Column heading',
              admin: { width: '50%' },
              required: true,
            },
            {
              name: 'hideTitle',
              type: 'checkbox',
              label: 'Hide heading',
              admin: { width: '50%', style: { alignSelf: 'flex-end' } },
            },
          ],
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          minRows: 0,
          maxRows: 12,
          fields: [link({ appearances: false })],
        },
      ],
    },

    // Social icons row
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social links',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon image',
          required: false,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Icon alt text / visible label',
          required: false,
          localized: true,
          admin: {
            description: 'Shown as the visible text if no icon image is selected.',
          },
        },
        link({ appearances: false, disableLabel: true }),
      ],
    },

    // Bottom copyright text
    {
      name: 'bottomText',
      type: 'text',
      label: 'Bottom text (e.g. © year Company. All rights reserved.)',
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
