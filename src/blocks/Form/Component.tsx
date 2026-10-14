'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useSyncExternalStore } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { HONEYPOT_FIELD } from './honeypot'
import { useTranslations } from 'next-intl'

const subscribeNoop = () => () => {}

// False during server render and hydration, true once React handles events.
const useHydrated = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    // Explicit per-field defaults. Without them react-hook-form reads the initial value from the
    // DOM, and an untouched Radix checkbox reports its `value="on"`, so even an unchecked required
    // consent box passed as checked.
    defaultValues: Object.fromEntries(
      (formFromProps.fields ?? []).flatMap((field) =>
        'name' in field && field.name
          ? [
              [
                field.name,
                field.blockType === 'checkbox'
                  ? Boolean(field.defaultValue)
                  : ('defaultValue' in field && field.defaultValue) || '',
              ],
            ]
          : [],
      ),
    ),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<string | undefined>()
  const router = useRouter()
  const t = useTranslations('form')
  const hydrated = useHydrated()

  const onSubmit = useCallback(
    (data: Record<string, unknown>, event?: React.BaseSyntheticEvent) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const honeypot =
          event?.target instanceof HTMLFormElement
            ? (new FormData(event.target).get(HONEYPOT_FIELD) ?? '')
            : ''

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
              [HONEYPOT_FIELD]: honeypot,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            // Server messages are English and technical; show a localized summary instead.
            console.warn('Form submission rejected', req.status, res.errors?.[0]?.message)
            setError(
              req.status === 429 ? t('tooMany') : req.status < 500 ? t('invalid') : t('failed'),
            )

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError(t('failed'))
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, t],
  )

  return (
    <div className="container lg:max-w-3xl">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>{t('submitting')}</p>}
          {error && (
            <div role="alert" className="mb-4 text-red-500">
              {error}
            </div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              {/* Honeypot: hidden from people and assistive tech; bots that fill it are rejected. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  {t('honeypot')}
                  <input autoComplete="off" name={HONEYPOT_FIELD} tabIndex={-1} type="text" />
                </label>
              </div>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              {/* Disabled until hydrated: before that, a click would submit the form natively as a GET
                  and put the visitor's message and email in the URL. */}
              <Button disabled={!hydrated} form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
