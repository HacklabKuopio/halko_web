'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error = ({ name }: { name: string }) => {
  const t = useTranslations('form')
  const {
    formState: { errors },
  } = useFormContext()
  const error = errors[name]
  const custom = typeof error?.message === 'string' && error.message ? error.message : null

  return (
    <div className="mt-2 text-red-500 text-sm">
      {custom || (error?.type === 'pattern' ? t('invalidEmail') : t('required'))}
    </div>
  )
}
