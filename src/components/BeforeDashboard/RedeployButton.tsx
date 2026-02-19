'use client'
import React, { useCallback, useState } from 'react'
import { Button } from '@payloadcms/ui/elements/Button'
import { useLocale } from '@payloadcms/ui'

const translations = {
  en: {
    building: 'Building...',
    triggerBuild: 'Trigger Build',
    success: 'Redeploy request sent successfully.',
    error: 'Failed to send redeploy request.',
  },
  fi: {
    building: 'Rakennetaan...',
    triggerBuild: 'Käynnistä julkaisu',
    success: 'Julkaisupyyntö lähetetty onnistuneesti.',
    error: 'Julkaisupyynnön lähetys epäonnistui.',
  },
}

const RedeployButton: React.FC = () => {
  const locale = useLocale()
  const t = translations[locale.code === 'fi' ? 'fi' : 'en']
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleClick = useCallback(async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/redeploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed with status ${res.status}`)
      }

      setMessage(t.success)
    } catch (err: any) {
      setMessage(err?.message || t.error)
    } finally {
      setIsLoading(false)
    }
  }, [t])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Button buttonStyle="secondary" size="small" onClick={handleClick} disabled={isLoading}>
        {isLoading ? t.building : t.triggerBuild}
      </Button>
      {message && (
        <div style={{ fontSize: '0.75rem', color: 'var(--theme-success-500)' }}>{message}</div>
      )}
    </div>
  )
}

export default RedeployButton
