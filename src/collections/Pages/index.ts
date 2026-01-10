import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { Sponsors } from '../../blocks/Sponsors/config'
import {
  AboutSectionBlock,
  ContactSectionBlock,
  EventsSectionBlock,
  HeroSectionBlock,
  MembershipSectionBlock,
} from '../../blocks/Kuosec/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: {
      en: 'Page',
      fi: 'Sivu',
    },
    plural: {
      en: 'Pages',
      fi: 'Sivut',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        fi: 'Otsikko',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: {
            en: 'Hero',
            fi: 'Hero',
          },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                ...(process.env.HOSTNAME === 'kuosec.fi' || process.env.IS_DEV
                  ? [
                      AboutSectionBlock,
                      ContactSectionBlock,
                      EventsSectionBlock,
                      HeroSectionBlock,
                      MembershipSectionBlock,
                    ]
                  : []),
                ...(process.env.HOSTNAME === 'halko.fi' || process.env.IS_DEV ? [Sponsors] : []),
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
              label: {
                en: 'Layout',
                fi: 'Asettelu',
              },
            },
          ],
          label: {
            en: 'Content',
            fi: 'Sisältö',
          },
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Published At',
        fi: 'Julkaistu',
      },
    },
    {
      name: 'backgroundComponent',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'Grid Background (Kuosec)', value: 'grid' },
      ],
      defaultValue: 'none',
      label: 'Background Component',
    },
    ...slugField('title', {
      slugOverrides: {
        label: {
          en: 'Slug',
          fi: 'Polkutunnus',
        },
      },
    }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
