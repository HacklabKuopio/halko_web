'use client'

import React from 'react'
import clsx from 'clsx'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const HeaderNav: React.FC<{ header: HeaderType; className?: string; onNavigate?: () => void }> = ({ header, className, onNavigate }) => {
  const navItems = header?.navItems || []
  const t = useTranslations()

  return (
    <nav className={clsx('flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4', className)}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            onClick={onNavigate}
            className="text-sm"
          />
        )
      })}
      <Link href="/search" className="sm:ms-2 inline-flex items-center" onClick={onNavigate}>
        <span className="sr-only">{t('search')}</span>
        <SearchIcon className="w-5 h-5 text-primary" />
      </Link>
    </nav>
  )
}
