'use client'

import React from 'react'
import clsx from 'clsx'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'
import { LocaleSwitcher } from '@/Header/Component.client'

export const HeaderNav: React.FC<{
  header: HeaderType
  className?: string
  onNavigateAction?: () => void
}> = ({ header, className, onNavigateAction }) => {
  const navItems = header?.navItems || []

  return (
    <nav className={clsx('flex w-full flex-col items-end text-right gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4', className)}>
      {navItems.map((item, i) => {
        const children = item.children || []
        const hasChildren = children.length > 0
        return (
          <div key={i} className="relative group w-full sm:w-auto">
            {hasChildren ? (
              <span className="text-sm inline-flex items-center gap-1 px-2 py-1 w-full justify-end text-right sm:w-auto">
                {item.link?.label}
                <ChevronDown className="hidden sm:inline-block h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition" />
              </span>
            ) : (
              <CMSLink
                {...item.link}
                appearance="link"
                onClick={onNavigateAction}
                className="text-sm inline-flex items-center gap-1 px-2 py-1 w-full justify-end text-right sm:w-auto"
              />
            )}
            {/* Desktop dropdown: use top-full + pt-2 so there's no hover gap */}
            {hasChildren && (
              <div className="hidden sm:block absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                <div className="min-w-40 rounded-md border bg-popover text-popover-foreground shadow-md">
                  <ul className="py-2">
                    {children.map(({ link }, j) => (
                      <li key={j}>
                        <CMSLink {...link} className="block px-3 py-2 text-sm hover:bg-accent text-right" onClick={onNavigateAction} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Mobile subitems (stacked inline) */}
            {hasChildren && (
              <ul className="sm:hidden pr-3 mt-1 border-r w-full">
                {children.map(({ link }, j) => (
                  <li key={j} className="w-full">
                    <CMSLink {...link} className="block w-full py-1 text-sm text-right justify-end" onClick={onNavigateAction} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
      {/* Mobile language switcher: right-aligned, below links */}
      <LocaleSwitcher className="sm:hidden mt-1" />
    </nav>
  )
}
