import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { BrandTheme } from '@/Brand/Theme'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { TypedLocale } from 'payload'

import './globals.css'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import type { Locale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import localization from '@/i18n/localization'
import Script from 'next/script'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Brand, Media } from '@/payload-types'

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: Locale
  }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params
  const currentLocale = localization.locales.find((loc) => loc.code === locale)
  const direction = currentLocale?.rtl ? 'rtl' : 'ltr'
  const brand: Brand = await getCachedGlobal('brand', 1, locale as TypedLocale)()

  if (!routing.locales.includes(locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()
  const messages = await getMessages()

  // Dynamic Favicon URL (if provided)
  let faviconUrl = '/favicon.ico'
  let faviconType = 'image/x-icon'
  if (brand?.favicon && typeof brand.favicon === 'object') {
    const favMedia = brand.favicon as Media
    if (favMedia.url) {
      faviconUrl = favMedia.url
      faviconType = favMedia.mimeType || 'image/png'
    }
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href={faviconUrl} rel="icon" type={faviconType} />
        {/* Google Fonts — preconnect to reduce render-blocking delay */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {brand?.googleFontsCode && <link href={brand.googleFontsCode} rel="stylesheet" />}
        <title>{brand?.name || process.env.WEBSITE_NAME || 'MyWebsite'}</title>

        {/* Brand Head Code */}
        {brand?.headCode && <div dangerouslySetInnerHTML={{ __html: brand.headCode }} />}

        {/* Plausible Analytics — deferred to avoid blocking FCP/TBT */}
        <Script strategy="lazyOnload" src={process.env.PLAUSIBLE_INIT} />
        <Script strategy="lazyOnload" id="plausible-init">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body>
        <BrandTheme brand={brand} />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <NextIntlClientProvider messages={messages}>
            {isEnabled && <LivePreviewListener />}
            <Header locale={locale as TypedLocale} />
            <noscript>
              For the best experience, please enable JavaScript in your browser settings.
            </noscript>
            {children}
            <Footer locale={locale as TypedLocale} />
          </NextIntlClientProvider>
        </Providers>
        {/* Brand Footer Code */}
        {brand?.footerCode && <div dangerouslySetInnerHTML={{ __html: brand.footerCode }} />}
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const brand: Brand = await getCachedGlobal('brand', 1)()
  let ogImageUrl = null

  if (brand?.ogImage && typeof brand.ogImage === 'object') {
    const ogMedia = brand.ogImage as Media
    if (ogMedia.url) ogImageUrl = ogMedia.url
  }

  const websiteName = brand?.name || process.env.WEBSITE_NAME || 'MyWebsite'

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
    openGraph: mergeOpenGraph(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    twitter: {
      card: 'summary_large_image',
      creator: '@jeb4',
    },
    robots: {
      index: true,
      follow: true,
    },
    publisher: websiteName,
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
