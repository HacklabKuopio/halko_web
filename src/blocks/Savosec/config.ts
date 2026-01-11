import type { Block } from 'payload'
import { link } from '@/fields/link'

export const SavosecHeroBlock: Block = {
  slug: 'savosecHero',
  interfaceName: 'SavosecHeroBlock',
  labels: {
    singular: {
      en: 'Savosec Hero',
      fi: 'Savosec Hero',
    },
    plural: {
      en: 'Savosec Heroes',
      fi: 'Savosec Herot',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'SavoSec 2025',
      label: {
        en: 'Title',
        fi: 'Otsikko',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: 'Kyberuhat ja varautuminen nyt',
      label: {
        en: 'Subtitle',
        fi: 'Alaotsikko',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue: 'Yrityksille ja tietoturva-alasta kiinnostuneille',
      label: {
        en: 'Description',
        fi: 'Kuvaus',
      },
    },
    {
      name: 'date',
      type: 'text',
      localized: true,
      defaultValue: '8.5.2025',
      label: {
        en: 'Date',
        fi: 'Päivämäärä',
      },
    },
    {
      name: 'time',
      type: 'text',
      localized: true,
      defaultValue: 'Klo 17:00 - 21:00',
      label: {
        en: 'Time',
        fi: 'Aika',
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      defaultValue: 'Kuopio, Novapolis CoWork',
      label: {
        en: 'Location',
        fi: 'Sijainti',
      },
    },
    {
      name: 'freeEventText',
      type: 'text',
      localized: true,
      defaultValue: 'Maksuton tapahtuma',
      label: {
        en: 'Free Event Text',
        fi: 'Maksuton tapahtuma -teksti',
      },
    },
    link({
      overrides: {
        name: 'registerLink',
        label: {
          en: 'Register Link',
          fi: 'Ilmoittautumislinkki',
        },
      },
    }),
    link({
      overrides: {
        name: 'scheduleLink',
        label: {
          en: 'Schedule Link',
          fi: 'Ohjelmalinkki',
        },
      },
    }),
  ],
}

export const SavosecAboutBlock: Block = {
  slug: 'savosecAbout',
  interfaceName: 'SavosecAboutBlock',
  labels: {
    singular: {
      en: 'Savosec About',
      fi: 'Savosec Tietoa',
    },
    plural: {
      en: 'Savosec About Sections',
      fi: 'Savosec Tieto-osiot',
    },
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: '// Tietoa tapahtumasta',
      label: {
        en: 'Subtitle',
        fi: 'Alaotsikko',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Mitä on SavoSec?',
      label: {
        en: 'Title',
        fi: 'Otsikko',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue: 'Tervetuloa KuoSec Ry:n järjestämään vuosittaiseen tietoturvatapahtumaan Savon pääkaupunkiin.',
      label: {
        en: 'Description',
        fi: 'Kuvaus',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: {
        en: 'Features',
        fi: 'Ominaisuudet',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Shield', value: 'Shield' },
            { label: 'Users', value: 'Users' },
            { label: 'Wifi', value: 'Wifi' },
            { label: 'Terminal', value: 'Terminal' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: {
            en: 'Title',
            fi: 'Otsikko',
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
      ],
    },
  ],
}

export const SavosecScheduleBlock: Block = {
  slug: 'savosecSchedule',
  interfaceName: 'SavosecScheduleBlock',
  labels: {
    singular: {
      en: 'Savosec Schedule',
      fi: 'Savosec Ohjelma',
    },
    plural: {
      en: 'Savosec Schedules',
      fi: 'Savosec Ohjelmat',
    },
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: '// Ohjelma',
      label: {
        en: 'Subtitle',
        fi: 'Alaotsikko',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Päivän aikataulu',
      label: {
        en: 'Title',
        fi: 'Otsikko',
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
          label: {
           en: 'Time',
           fi: 'Aika',
          },
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
            label: {
                en: 'Title',
                fi: 'Otsikko',
            },
        },
        {
            name: 'speaker',
            type: 'text',
            localized: true,
            label: {
                en: 'Speaker',
                fi: 'Puhuja',
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
            name: 'type',
            type: 'select',
            options: [
                { label: 'Talk', value: 'talk' },
                { label: 'Break', value: 'break' },
                { label: 'Networking', value: 'networking' },
            ],
            defaultValue: 'talk',
            label: {
                en: 'Type',
                fi: 'Tyyppi',
            },
        }
      ],
    },
  ],
}

export const SavosecSpeakersBlock: Block = {
  slug: 'savosecSpeakers',
  interfaceName: 'SavosecSpeakersBlock',
  labels: {
    singular: {
      en: 'Savosec Speakers',
      fi: 'Savosec Puhujat',
    },
    plural: {
      en: 'Savosec Speaker Sections',
      fi: 'Savosec Puhujaosiot',
    },
  },
  fields: [
      {
          name: 'subtitle',
          type: 'text',
          localized: true,
          defaultValue: '// Puhujat',
            label: {
                en: 'Subtitle',
                fi: 'Alaotsikko',
            },
      },
      {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Asiantuntijat lavalla',
            label: {
                en: 'Title',
                fi: 'Otsikko',
            },
      },
      {
          name: 'speakers',
          type: 'array',
        label: {
            en: 'Speakers',
            fi: 'Puhujat',
        },
          fields: [
              {
                  name: 'name',
                  type: 'text',
                    label: {
                        en: 'Name',
                        fi: 'Nimi',
                    },
              },
              {
                  name: 'title',
                  type: 'text',
                  localized: true,
                    label: {
                        en: 'Title',
                        fi: 'Titteli',
                    },
              },
              {
                  name: 'company',
                  type: 'text',
                  localized: true,
                    label: {
                        en: 'Company',
                        fi: 'Yritys',
                    },
              },
              {
                  name: 'bio',
                  type: 'textarea',
                  localized: true,
                    label: {
                        en: 'Bio',
                        fi: 'Kuvaus',
                    },
              },
              {
                  name: 'initials',
                  type: 'text',
                    label: {
                        en: 'Initials',
                        fi: 'Nimikirjaimet',
                    },
              },
              {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: {
                      en: 'Image',
                      fi: 'Kuva',
                  },
              }
          ]
      }
  ]
}

export const SavosecSponsorsBlock: Block = {
    slug: 'savosecSponsors',
    interfaceName: 'SavosecSponsorsBlock',
    labels: {
        singular: {
            en: 'Savosec Sponsors',
            fi: 'Savosec Yhteistyökumppanit',
        },
        plural: {
            en: 'Savosec Sponsor Sections',
            fi: 'Savosec Yhteistyökumppaniosiot',
        },
    },
    fields: [
        {
            name: 'subtitle',
            type: 'text',
            localized: true,
            defaultValue: '// Yhteistyökumppanit',
            label: {
                en: 'Subtitle',
                fi: 'Alaotsikko',
            },
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
            defaultValue: 'Tapahtuman mahdollistajat',
            label: {
                en: 'Title',
                fi: 'Otsikko',
            },
        },
        {
            name: 'backgroundTitle',
            type: 'text',
            localized: true,
            defaultValue: 'PARTNERS',
            label: {
                en: 'Background Title',
                fi: 'Taustaotsikko',
            },
        },
        {
            name: 'sponsors',
            type: 'array',
            label: {
                en: 'Sponsors',
                fi: 'Yhteistyökumppanit',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: {
                        en: 'Name',
                        fi: 'Nimi',
                    },
                },
                {
                    name: 'url',
                    type: 'text',
                    label: {
                        en: 'URL',
                        fi: 'Osoite',
                    },
                }
            ]
        },
        {
            name: 'becomeSponsorText',
            type: 'textarea',
            localized: true,
            defaultValue: 'Kiinnostunut yhteistyöstä?',
            label: {
                en: 'Become Sponsor Text',
                fi: 'Ryhdy kumppaniksi -teksti',
            },
        },
        link({
            overrides: {
                name: 'contactLink',
                label: {
                    en: 'Contact Link',
                    fi: 'Yhteystietolinkki',
                },
            },
        }),
    ]
}
