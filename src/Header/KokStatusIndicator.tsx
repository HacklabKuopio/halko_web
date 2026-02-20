'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

interface KokStatusResponse {
  last_changed_utc: string
  kok_state: 'True' | 'False'
}

interface KokStatusIndicatorProps {
  className?: string
}

export const KokStatusIndicator: React.FC<KokStatusIndicatorProps> = ({ className }) => {
  const [isOn, setIsOn] = useState<boolean | null>(null)
  const [lastChanged, setLastChanged] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    let abortController: AbortController | null = null

    const fetchStatus = async () => {
      abortController?.abort()
      abortController = new AbortController()

      try {
        setError(null)
        const res = await fetch('https://kok.halko.fi/status', {
          method: 'GET',
          cache: 'no-store',
          signal: abortController.signal,
        })

        if (!res.ok) {
          setError(`HTTP ${res.status}`)
          setIsOn((prev) => (prev === null ? false : prev))
          return
        }

        const data: KokStatusResponse = await res.json()
        setIsOn(data.kok_state === 'True')
        setLastChanged(data.last_changed_utc)
      } catch (e: any) {
        if (e && e.name === 'AbortError') return

        setError(e.message || 'Fetch error')
        setIsOn((prev) => (prev === null ? false : prev))
      }
    }

    void fetchStatus()

    timeoutId = setInterval(() => {
      void fetchStatus()
    }, 30_000)

    return () => {
      if (timeoutId) clearInterval(timeoutId)
      abortController?.abort()
    }
  }, [])

  const colorClass = isOn ? 'bg-green-500' : 'bg-gray-400'
  const pulseClass = isOn ? 'animate-pulse' : ''

  const label = error
    ? 'Kok status unknown'
    : isOn === null
      ? 'Loading kok status'
      : isOn
        ? 'Kok is on'
        : 'Kok is off'

  return (
    <div className={clsx('inline-flex items-center', className)}>
      <span
        role="status"
        aria-label={label}
        title={lastChanged ? `${label}\nLast change: ${lastChanged}` : label}
        className={clsx(
          'h-3 w-3 rounded-full shadow-inner transition-colors',
          colorClass,
          pulseClass,
        )}
      />
    </div>
  )
}

export default KokStatusIndicator
