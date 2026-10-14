'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

export const RequiredMark: React.FC = () => {
  const t = useTranslations('form')
  return (
    <span className="required">
      * <span className="sr-only">{t('requiredSr')}</span>
    </span>
  )
}
