import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SponsorsBlock } from '@/blocks/Sponsors/Component'
import { TypedLocale } from 'payload'

import AboutSection from '@/blocks/Kuosec/AboutSection'
import ContactSection from '@/blocks/Kuosec/ContactSection'
import EventsSection from '@/blocks/Kuosec/EventsSection'
import HeroSection from '@/blocks/Kuosec/HeroSection'
import MembershipSection from '@/blocks/Kuosec/MembershipSection'

import SavosecAbout from '@/blocks/Savosec/About'
import SavosecHero from '@/blocks/Savosec/Hero'
import SavosecSchedule from '@/blocks/Savosec/Schedule'
import SavosecSpeakers from '@/blocks/Savosec/Speakers'
import SavosecSponsors from '@/blocks/Savosec/Sponsors'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  sponsors: process.env.HOSTNAME === 'halko.fi' ? SponsorsBlock : null,
  aboutSection: process.env.HOSTNAME === 'kuosec.fi' ? AboutSection : null,
  contactSection: process.env.HOSTNAME === 'kuosec.fi' ? ContactSection : null,
  eventsSection: process.env.HOSTNAME === 'kuosec.fi' ? EventsSection : null,
  heroSection: process.env.HOSTNAME === 'kuosec.fi' ? HeroSection : null,
  membershipSection: process.env.HOSTNAME === 'kuosec.fi' ? MembershipSection : null,
  savosecAbout: process.env.HOSTNAME === 'savosec.fi' ? SavosecAbout : null,
  savosecHero: process.env.HOSTNAME === 'savosec.fi' ? SavosecHero : null,
  savosecSchedule: process.env.HOSTNAME === 'savosec.fi' ? SavosecSchedule : null,
  savosecSpeakers: process.env.HOSTNAME === 'savosec.fi' ? SavosecSpeakers : null,
  savosecSponsors: process.env.HOSTNAME === 'savosec.fi' ? SavosecSponsors : null,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: TypedLocale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="render-block my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
