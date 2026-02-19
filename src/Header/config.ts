import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Image shown in the site header',
      },
    },
    {
      name: 'enableKokStatus',
      type: 'checkbox',
      label: 'Enable Kok Status Indicator',
      defaultValue: false,
      admin: {
        description: 'Show the Kok status indicator (green/gray circle) for this site.',
        condition: () => process.env.HOSTNAME === 'halko.fi',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'customClass',
          type: 'text',
          label: 'Custom CSS Class',
          admin: {
            description: 'Optional custom class for this item (e.g. "cta-btn" for button styling).',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown links (optional)',
          admin: { initCollapsed: true },
          fields: [link({ appearances: false })],
        },
      ],
      maxRows: 12,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
        description: 'Add optional dropdown links under each item',
      },
    },
    {
      name: 'customCss',
      type: 'code',
      label: 'Custom CSS',
      admin: {
        language: 'css',
        description: 'Custom CSS for the header. Use & to reference the header element.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
