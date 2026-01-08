'use client'

import React, { useCallback } from 'react'
import { FieldLabel, Select, useField, useForm } from '@payloadcms/ui'
import { SelectFieldClientProps } from 'payload'
import { themes } from '@/Brand/themes'

// Helper to convert HSL string to Hex for the color picker
// Since the themes store HSL (e.g. "0 0% 100%"), we need to approximate or just store the HSL if the color picker supports it.
// The previous ColorPicker implementation expects HEX.
// Wait, the themes.ts uses HSL (e.g. '0 0% 100%').
// The ColorPicker validates for Hex: /^#[0-9A-F]{6}$/i
// We need a conversion function HSL -> Hex.

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function parseHslString(hsl: string): string | null {
  // Format is "H S% L%" or "H S L"
  // e.g. "222.2 84% 4.9%"
  const parts = hsl.trim().split(' ');
  if (parts.length !== 3) return null;

  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1].replace('%', ''));
  const l = parseFloat(parts[2].replace('%', ''));

  return hslToHex(h, s, l);
}

function cssVarToFieldName(cssVar: string): string {
  const raw = cssVar.replace(/^--/, '')
  return raw.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

export const ThemeSelector: React.FC<SelectFieldClientProps> = (props) => {
  const { path, field } = props;
  const { value, setValue } = useField<string>({ path: path || field.name });
  const { dispatchFields } = useForm();

  // Transform options for the Select component
  // payload Select component expects options in specific format
  const options = field.options.map((opt) => {
    if (typeof opt === 'string') return { label: opt, value: opt }
    return opt
  })

  const handleThemeChange = useCallback(
    (selectedOption: any) => {
      // selectedOption is the Option object { label, value }
      const newValue = selectedOption?.value

      setValue(newValue as string)

      if (!newValue) return

      const themeName = newValue as keyof typeof themes
      const themeData = themes[themeName]

      if (!themeData) return

      // We need to merge with base 'slate' theme just like Theme.tsx does
      // to ensure we have all values
      const baseTheme = themes.slate
      const lightMap = { ...baseTheme.light, ...(themeData.light || {}) }
      const darkMap = { ...baseTheme.dark, ...(themeData.dark || {}) }

      // Update Light Mode Fields
      // Mapping keys from css vars to field names
      // e.g. '--background' -> 'background'
      Object.entries(lightMap).forEach(([key, val]) => {
        const fieldName = cssVarToFieldName(key)
        const hex = parseHslString(val)
        if (hex) {
          dispatchFields({
            type: 'UPDATE',
            path: fieldName,
            value: hex,
          })
        }
      })

      // Update Dark Mode Fields
      // e.g. '--background' -> 'dark_background'
      Object.entries(darkMap).forEach(([key, val]) => {
        const fieldName = 'dark_' + cssVarToFieldName(key)
        const hex = parseHslString(val)
        if (hex) {
          dispatchFields({
            type: 'UPDATE',
            path: fieldName,
            value: hex,
          })
        }
      })
    },
    [setValue, dispatchFields],
  )

  return (
    <div className="field-type select-field-component">
      <FieldLabel htmlFor={`field-${path}`} label={field.label} required={field.required} />
      <Select
        inputId={`field-${path}`}
        options={options}
        onChange={handleThemeChange}
        value={options.find((opt) => opt.value === value)}
      />
    </div>
  )
}
