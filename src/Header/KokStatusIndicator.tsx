'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface KokStatusResponse {
  last_changed_utc: string
  kok_state: 'True' | 'False'
}

interface KokStatusIndicatorProps {
  className?: string
}

type Status = 'loading' | 'open' | 'closed' | 'unknown'

export const KokStatusIndicator: React.FC<KokStatusIndicatorProps> = ({ className }) => {
  const t = useTranslations('labStatus')
  const [status, setStatus] = useState<Status>('loading')
  const [lastChanged, setLastChanged] = useState<string | null>(null)

  useEffect(() => {
    let abortController: AbortController | null = null

    const fetchStatus = async () => {
      abortController?.abort()
      abortController = new AbortController()

      try {
        const res = await fetch('https://kok.halko.fi/status', {
          method: 'GET',
          cache: 'no-store',
          signal: abortController.signal,
        })

        if (!res.ok) {
          setStatus('unknown')
          return
        }

        const data: KokStatusResponse = await res.json()
        setStatus(data.kok_state === 'True' ? 'open' : 'closed')
        setLastChanged(data.last_changed_utc)
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') return
        // Don't show a failed lookup as "closed".
        setStatus('unknown')
      }
    }

    void fetchStatus()
    const intervalId = setInterval(() => void fetchStatus(), 30_000)

    return () => {
      clearInterval(intervalId)
      abortController?.abort()
    }
  }, [])

  const label = t(status)
  // The API returns UTC without a zone marker ("2026-10-14 14:44:56.24"); without the "Z"
  // browsers would parse it as local time.
  const lastChangedText = lastChanged
    ? `${t('lastChange')}: ${new Date(`${lastChanged.replace(' ', 'T')}Z`).toLocaleString()}`
    : null

  return (
    <div
      role="status"
      aria-live="polite"
      title={lastChangedText ? `${label}\n${lastChangedText}` : label}
      className={clsx('inline-flex items-center gap-2', className)}
    >
      <span
        aria-hidden
        className={clsx(
          'h-3 w-3 shrink-0 rounded-full transition-colors',
          status === 'open' && 'bg-green-500 animate-pulse',
          status === 'closed' && 'bg-gray-400',
          (status === 'unknown' || status === 'loading') &&
            'border-2 border-dashed border-gray-400 bg-transparent',
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default KokStatusIndicator
