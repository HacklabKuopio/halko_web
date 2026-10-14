import { APIError, type CollectionBeforeValidateHook } from 'payload'

import { HONEYPOT_FIELD } from '@/blocks/Form/honeypot'
import type { Form, FormSubmission } from '@/payload-types'

const MAX_VALUE_LENGTH = 5_000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormField = NonNullable<Form['fields']>[number]
type NamedField = Extract<FormField, { name: string }>

const invalid = (message: string) => new APIError(message, 400, null, true)

const toText = (value: unknown, fieldName: string): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  throw invalid(`Invalid value for field "${fieldName}".`)
}

const isEmpty = (field: NamedField, value: string) =>
  value === '' || (field.blockType === 'checkbox' && value !== 'true')

const validateValue = (field: NamedField, value: string) => {
  if (value.length > MAX_VALUE_LENGTH) {
    throw invalid(`Field "${field.name}" is too long (max ${MAX_VALUE_LENGTH} characters).`)
  }
  if (value === '') return

  switch (field.blockType) {
    case 'email':
      if (!EMAIL_PATTERN.test(value)) throw invalid(`Field "${field.name}" must be a valid email.`)
      break
    case 'number':
      if (!Number.isFinite(Number(value))) throw invalid(`Field "${field.name}" must be a number.`)
      break
    case 'checkbox':
      if (value !== 'true' && value !== 'false') throw invalid(`Invalid value for "${field.name}".`)
      break
    case 'select':
      if (field.options?.length && !field.options.some((option) => option.value === value)) {
        throw invalid(`Invalid option for field "${field.name}".`)
      }
      break
  }
}

/**
 * The form-builder plugin stores whatever the client sends. This checks public submissions
 * against the form definition: only declared fields, required fields present, sane types and
 * lengths. It also drops server-managed properties (id, timestamps) supplied by the client.
 */
export const validateFormSubmission: CollectionBeforeValidateHook<FormSubmission> = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' || !data) return data

  const raw = data as Record<string, unknown>
  if (typeof raw[HONEYPOT_FIELD] === 'string' && raw[HONEYPOT_FIELD] !== '') {
    throw invalid('Invalid submission.')
  }
  delete raw[HONEYPOT_FIELD]
  delete raw.id
  delete raw.createdAt
  delete raw.updatedAt

  const formId = typeof data.form === 'object' && data.form ? data.form.id : data.form
  if (!formId) throw invalid('Missing form.')

  let form: Form
  try {
    form = await req.payload.findByID({ collection: 'forms', id: formId, depth: 0, req })
  } catch {
    throw invalid('Cannot create this submission because this form does not exist.')
  }

  const fields = new Map(
    (form.fields ?? [])
      .filter((field): field is NamedField => 'name' in field && Boolean(field.name))
      .map((field) => [field.name, field]),
  )

  const submitted = Array.isArray(data.submissionData) ? data.submissionData : []
  if (data.submissionData != null && !Array.isArray(data.submissionData)) {
    throw invalid('Invalid submission data.')
  }

  const values = new Map<string, string>()
  for (const entry of submitted) {
    const name = entry?.field
    const field = typeof name === 'string' ? fields.get(name) : undefined
    if (!field) throw invalid('Submission contains unknown fields.')
    if (values.has(field.name)) throw invalid(`Duplicate field "${field.name}".`)

    const value = toText(entry.value, field.name)
    validateValue(field, value)
    values.set(field.name, value)
  }

  for (const field of fields.values()) {
    if (field.required && isEmpty(field, values.get(field.name) ?? '')) {
      throw invalid(`Field "${field.label || field.name}" is required.`)
    }
  }

  return {
    ...data,
    submissionData: [...values].map(([field, value]) => ({ field, value })),
  }
}
