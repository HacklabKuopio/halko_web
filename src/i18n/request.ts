import { getRequestConfig } from 'next-intl/server'
import type { Locale } from './routing'
import { routing } from './routing'

import en from './messages/en.json'

type Messages = typeof en

// Use type safe message keys with `next-intl`
export type IntlMessages = Messages

// Dummy helper to ensure IntlMessages is referenced
function _assertMessagesShape<T extends IntlMessages>(m: T): T {
  return m
}
_assertMessagesShape(en)

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
