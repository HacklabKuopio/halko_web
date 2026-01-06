'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'
import { PayloadAdminBar } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useParams, useRouter, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    en: {
      plural: 'Pages',
      singular: 'Page',
    },
    fi: {
      plural: 'Sivut',
      singular: 'Sivu',
    },
  },
  posts: {
    en: {
      plural: 'Posts',
      singular: 'Post',
    },
    fi: {
      plural: 'Artikkelit',
      singular: 'Artikkeli',
    },
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const params = useParams()
  const localeParam = params?.locale as string
  const locale = localeParam === 'fi' ? 'fi' : 'en'
  const [show, setShow] = useState(false)
  const collection = (collectionLabels[segments?.[1] as keyof typeof collectionLabels]
    ? segments[1]
    : collectionLabels[segments?.[0] as keyof typeof collectionLabels]
      ? segments[0]
      : 'pages') as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.[locale]?.plural || 'Pages',
            singular: collectionLabels[collection]?.[locale]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
