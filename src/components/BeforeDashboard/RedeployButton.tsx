'use client'
import React, { useCallback, useState } from 'react'
import { Button } from '@payloadcms/ui/elements/Button'

const RedeployButton: React.FC = () => {
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

      setMessage('Redeploy request sent successfully.')
    } catch (err: any) {
      setMessage(err?.message || 'Failed to send redeploy request.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Button buttonStyle="secondary" size="small" onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Building...' : 'Trigger Build'}
      </Button>
      {message && <div style={{ fontSize: '0.75rem', color: 'var(--theme-success-500)' }}>{message}</div>}
    </div>
  )
}

export default RedeployButton
