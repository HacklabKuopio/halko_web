'use client'

import React from 'react'
import { TextFieldClientProps } from 'payload'
import { FieldLabel, TextInput, useField } from '@payloadcms/ui'
import './styles.css'

export const ColorPicker: React.FC<TextFieldClientProps> = ({ field, path, readOnly }) => {
  const { label, required } = field
  const { value, setValue } = useField<string>({ path: path || field.name }) // This hook handles context

  return (
    <div className="field-type color-picker-field">
      <FieldLabel htmlFor={`field-${path}`} label={label} required={required} />
      <div className="color-picker-wrapper">
        <div className="color-preview">
          <input
            type="color"
            value={value && /^#[0-9A-F]{6}$/i.test(value) ? value : '#000000'}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            disabled={readOnly}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <TextInput
            path={path || field.name}
            value={value || ''}
            onChange={setValue}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  )
}
