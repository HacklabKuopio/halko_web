import type { Block } from 'payload'

export const CustomerSpecific: Block = {
  slug: 'customerSpecific',
  labels: {
    singular: 'Customer Specific Block',
    plural: 'Customer Specific Blocks',
  },
  fields: [
    {
      name: 'message',
      type: 'text',
      label: 'Message',
    },
  ],
}

