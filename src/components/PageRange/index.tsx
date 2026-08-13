import { getTranslations } from 'next-intl/server'
import React from 'react'

/**
 * Renders "Showing 1–5 of 5" / "Näytetään 1–5 / 5".
 *
 * The count is deliberately not followed by a noun: Finnish would need the partitive
 * ("5 julkaisua", not "5 Julkaisut"), and that is not something a plural/singular pair
 * can express. The whole sentence lives in the message catalogue instead.
 */
export const PageRange: React.FC<{
  className?: string
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = async (props) => {
  const { className, currentPage, limit, totalDocs } = props
  const t = await getTranslations()

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const hasResults = typeof totalDocs !== 'undefined' && totalDocs > 0

  return (
    <div className={[className, 'text-sm text-muted-foreground'].filter(Boolean).join(' ')}>
      {hasResults
        ? t('showing-range', { start: indexStart, end: indexEnd, total: totalDocs })
        : t('no-results')}
    </div>
  )
}
