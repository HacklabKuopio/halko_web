import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SponsorsBlock } from '@/blocks/Sponsors/Component'
import { CustomerSpecificBlock } from '@/blocks/CustomerSpecific/Component'
import { TypedLocale } from 'payload'

import AboutSection from '@/blocks/Kuosec/AboutSection'
import ContactSection from '@/blocks/Kuosec/ContactSection'
import EventsSection from '@/blocks/Kuosec/EventsSection'
import HeroSection from '@/blocks/Kuosec/HeroSection'
import MembershipSection from '@/blocks/Kuosec/MembershipSection'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  sponsors: SponsorsBlock,
  customerSpecific: CustomerSpecificBlock,
  aboutSection: process.env.HOSTNAME === 'kuosec.fi' ? AboutSection : null,
  contactSection: process.env.HOSTNAME === 'kuosec.fi' ? ContactSection : null,
  eventsSection: process.env.HOSTNAME === 'kuosec.fi' ? EventsSection : null,
  heroSection: process.env.HOSTNAME === 'kuosec.fi' ? HeroSection : null,
  membershipSection: process.env.HOSTNAME === 'kuosec.fi' ? MembershipSection : null,
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
