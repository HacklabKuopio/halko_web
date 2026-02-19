'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useLocale } from 'next-intl'
import localization from '@/i18n/localization'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'
import { Menu, X } from 'lucide-react'
import { KokStatusIndicator } from './KokStatusIndicator'
import { Media } from '@/components/Media'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  // Store theme to avoid hydration errors
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setOpen(false) // Close mobile menu on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      id="site-header"
      className="sticky top-0 inset-x-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {header.customCss && (
        <style
          dangerouslySetInnerHTML={{ __html: header.customCss.replace(/&/g, '#site-header') }}
        />
      )}
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center shrink-0">
          {header?.logo ? (
            <Media
              resource={header.logo as any}
              imgClassName="h-8 w-auto object-contain"
              pictureClassName="block"
            />
          ) : (
            <Logo />
          )}
        </Link>

        {/* Mobile-only language switcher positioned left next to logo */}
        {/* Removed: now rendered inside mobile dropdown in HeaderNav */}

        {/* Right side controls */}
        <div className="ms-auto flex items-center gap-3">
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            <HeaderNav header={header} className="flex-row" />
            {header.enableKokStatus && <KokStatusIndicator />}
            <LocaleSwitcher className="ms-2" />
          </div>

          <div className="block sm:hidden">{header.enableKokStatus && <KokStatusIndicator />}</div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((o) => !o)}
            className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel (collapsible under header) */}
      <div
        className={`sm:hidden transition-[max-height] duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[500px]' : 'max-h-0'}`}
      >
        <div className="px-4 pb-4 pt-3 flex flex-col gap-4 border-t bg-background">
          <HeaderNav
            header={header}
            className="items-start text-left"
            onNavigateAction={() => setOpen(false)}
          />
          {/* Removed mobile LocaleSwitcher here (moved next to logo) */}
        </div>
      </div>
    </header>
  )
}

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: TypedLocale) {
    if (value === locale) return
    startTransition(() => {
      router.replace(
        // @ts-expect-error validated by next-intl routing
        { pathname, params },
        { locale: value },
      )
    })
  }

  const locales = localization.locales.slice().sort((a, b) => a.label.localeCompare(b.label))
  const activeIndex = locales.findIndex((l) => l.code === locale)
  const count = locales.length

  return (
    <div className={className || ''}>
      <div
        role="group"
        aria-label="Language selector"
        className="relative inline-flex items-center rounded-md border border-muted-foreground/20 bg-muted/40 backdrop-blur-sm p-1 text-xs"
      >
        <span
          aria-hidden
          className="absolute inset-y-1 rounded-sm bg-background shadow transition-transform duration-200 ease-out"
          style={{
            left: '4px',
            width: `calc((100% - 8px) / ${count})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {locales.map((loc, i) => {
          const isActive = i === activeIndex
          const code = loc.code.toUpperCase()
          return (
            <button
              key={loc.code}
              type="button"
              aria-pressed={isActive}
              aria-current={isActive ? 'true' : undefined}
              title={loc.label}
              onClick={() => onSelectChange(loc.code as TypedLocale)}
              className="relative z-10 min-w-[32px] px-2 py-1 flex-1 inline-flex justify-center leading-none font-medium tracking-wide uppercase text-[11px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
            >
              <span className={isActive ? 'text-foreground' : 'text-muted-foreground'}>{code}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
