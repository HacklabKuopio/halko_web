import type { GlobalConfig, Field } from 'payload'
import { revalidateBrand } from './hooks/revalidateBrand'
import { themes } from './themes'

function hslToHex(h: number, s: number, l: number) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

function parseHslString(hsl: string): string {
  const parts = hsl.trim().split(' ')
  if (parts.length !== 3) return ''

  const h = parseFloat(parts[0])
  const s = parseFloat(parts[1].replace('%', ''))
  const l = parseFloat(parts[2].replace('%', ''))

  return hslToHex(h, s, l)
}

const colorField = (name: string, label: string): Field => {
  const isDark = name.startsWith('dark_')
  const mode = isDark ? 'dark' : 'light'
  const baseName = name.replace(/^dark_/, '')
  const token = '--' + baseName.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
  // @ts-ignore
  const hsl = themes.slate[mode][token]
  const defaultValue = hsl ? parseHslString(hsl) : undefined

  return {
    name,
    type: 'text',
    label,
    defaultValue,
    admin: {
      components: {
        Field: '@/components/ColorPicker/Component.client#ColorPicker',
      },
    },
    validate: (val: string | null | undefined) => {
      if (!val) return true
      if (/^#[0-9A-F]{6}$/i.test(val)) return true
      return 'Please enter a valid hex color (e.g. #3B82F6)'
    },
  }
}

const createColorFields = (prefix: string = ''): Field[] => [
  {
    type: 'row',
    fields: [
      colorField(`${prefix}background`, 'Background'),
      colorField(`${prefix}foreground`, 'Foreground (Text)'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}card`, 'Card Background'),
      colorField(`${prefix}cardForeground`, 'Card Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}popover`, 'Popover Background'),
      colorField(`${prefix}popoverForeground`, 'Popover Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}primary`, 'Primary Color'),
      colorField(`${prefix}primaryForeground`, 'Primary Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}secondary`, 'Secondary Color'),
      colorField(`${prefix}secondaryForeground`, 'Secondary Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}muted`, 'Muted Background'),
      colorField(`${prefix}mutedForeground`, 'Muted Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}accent`, 'Accent Background'),
      colorField(`${prefix}accentForeground`, 'Accent Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}destructive`, 'Destructive Background'),
      colorField(`${prefix}destructiveForeground`, 'Destructive Text'),
    ],
  },
  {
    type: 'row',
    fields: [
      colorField(`${prefix}border`, 'Border Color'),
      colorField(`${prefix}input`, 'Input Border Color'),
      colorField(`${prefix}ring`, 'Ring Color'),
    ],
  },
]

export const Brand: GlobalConfig = {
  slug: 'brand',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Light Theme Colors',
          fields: [
            {
              name: 'theme',
              type: 'select',
              options: [
                { label: 'Slate (Default)', value: 'slate' },
                { label: 'Ocean (Blue)', value: 'ocean' },
                { label: 'Forest (Green)', value: 'forest' },
                { label: 'Rose (Pink)', value: 'rose' },
                { label: 'Amber (Orange)', value: 'amber' },
                { label: 'Violet (Purple)', value: 'violet' },
                { label: 'KuoSec (Cyberpunk)', value: 'kuosec' },
                { label: 'Terminal Green (SavoSec)', value: 'savosec' },
              ],
              defaultValue: 'slate',
              admin: {
                description: 'Select a base color theme. Custom colors below will override these presets.',
                components: {
                  Field: '@/components/ThemeSelector/Component.client#ThemeSelector',
                }
              },
            },
            ...createColorFields(), // Base fields (e.g. 'background')
          ],
        },
        {
          label: 'Dark Theme Colors',
          fields: createColorFields('dark_'), // Prefixed fields (e.g. 'dark_background')
        },
        {
          label: 'Typography & Layout',
          fields: [
            {
              name: 'font',
              type: 'select',
              options: [
                { label: 'Geist (Default)', value: 'geist' },
                { label: 'Inter', value: 'inter' },
                { label: 'Roboto', value: 'roboto' },
              ],
              defaultValue: 'geist',
              admin: {
                 description: 'Select the primary font family for the website.'
              }
            },
            {
              name: 'googleFontsCode',
              type: 'text',
              label: 'Google Fonts Link (Optional)',
              admin: {
                description: 'Paste the Google Fonts embed URL (href) here (e.g., https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap). This overrides the font selection above.',
              },
            },
            {
              name: 'customFontFamily',
              type: 'text',
              label: 'Custom Font Family Name',
              admin: {
                description: 'If using Google Fonts, enter the CSS font-family name here (e.g., "Open Sans").',
                condition: (_, siblingData) => !!siblingData?.googleFontsCode,
              },
            },
            {
              name: 'radius',
              type: 'select',
              label: 'Border Radius',
              defaultValue: '0.5rem',
              options: [
                { label: 'None (0px)', value: '0px' },
                { label: 'Small (0.3rem)', value: '0.3rem' },
                { label: 'Medium (0.5rem)', value: '0.5rem' },
                { label: 'Large (0.75rem)', value: '0.75rem' },
                { label: 'Full', value: '9999px' },
              ],
            }
          ]
        },
        {
          label: 'Custom CSS',
          fields: [
            {
              name: 'rawCss',
              type: 'code',
              label: 'Raw CSS',
              admin: {
                language: 'css',
                description: 'Add custom CSS here. This will be injected globally. Use with caution.',
              }
            }
          ]
        },
        {
          label: 'Assets & SEO',
          fields: [
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon (.ico or .png)',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default OG Image',
              admin: {
                description: 'Default image for social sharing.',
              },
            },
          ]
        },
        {
          label: 'Scripts',
          fields: [
            {
              name: 'headCode',
              type: 'code',
              label: 'Head Code',
              admin: {
                language: 'html',
                description: 'Code to inject into the <head> section (e.g., Google Analytics, Meta Pixel).',
              }
            },
            {
              name: 'footerCode',
              type: 'code',
              label: 'Footer Code',
              admin: {
                language: 'html',
                description: 'Code to inject before the closing </body> tag.',
              }
            }
          ]
        }
      ]
    }
  ],
  hooks: {
    afterChange: [revalidateBrand],
  },
}
