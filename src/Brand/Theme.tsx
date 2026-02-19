import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Brand } from '@/payload-types'
import { TypedLocale } from 'payload'
import { themes } from './themes'

function hexToHsl(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  let r = parseInt(result[1], 16)
  let g = parseInt(result[2], 16)
  let b = parseInt(result[3], 16)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s,
    l = (max + min) / 2
  if (max == min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`
}

export function BrandTheme({ brand }: { brand: Brand }) {
  if (!brand) return null

  const themeName = (brand.theme as keyof typeof themes) || 'slate'
  const baseTheme = themes.slate // Always fallback to slate base to ensure all vars are present
  const selectedTheme = themes[themeName] || themes.slate

  // Merge base slate with selected theme (in case selected theme is partial like 'ocean')
  const lightMap = { ...baseTheme.light, ...selectedTheme.light }
  const darkMap = { ...baseTheme.dark, ...selectedTheme.dark }

  const lightVars: string[] = []
  const darkVars: string[] = []

  // Helper to add color var override
  const addColor = (key: keyof Brand, cssVar: string, targetMap: Record<string, string>) => {
    const val = brand[key]
    if (typeof val === 'string' && val) {
      const hsl = hexToHsl(val)
      if (hsl) targetMap[cssVar] = hsl
    }
  }

  const mapColors = (prefix: string, targetMap: Record<string, string>) => {
    addColor(`${prefix}background` as keyof Brand, '--background', targetMap)
    addColor(`${prefix}foreground` as keyof Brand, '--foreground', targetMap)
    addColor(`${prefix}card` as keyof Brand, '--card', targetMap)
    addColor(`${prefix}cardForeground` as keyof Brand, '--card-foreground', targetMap)
    addColor(`${prefix}popover` as keyof Brand, '--popover', targetMap)
    addColor(`${prefix}popoverForeground` as keyof Brand, '--popover-foreground', targetMap)
    addColor(`${prefix}primary` as keyof Brand, '--primary', targetMap)
    addColor(`${prefix}primaryForeground` as keyof Brand, '--primary-foreground', targetMap)
    addColor(`${prefix}secondary` as keyof Brand, '--secondary', targetMap)
    addColor(`${prefix}secondaryForeground` as keyof Brand, '--secondary-foreground', targetMap)
    addColor(`${prefix}muted` as keyof Brand, '--muted', targetMap)
    addColor(`${prefix}mutedForeground` as keyof Brand, '--muted-foreground', targetMap)
    addColor(`${prefix}accent` as keyof Brand, '--accent', targetMap)
    addColor(`${prefix}accentForeground` as keyof Brand, '--accent-foreground', targetMap)
    addColor(`${prefix}destructive` as keyof Brand, '--destructive', targetMap)
    addColor(`${prefix}destructiveForeground` as keyof Brand, '--destructive-foreground', targetMap)
    addColor(`${prefix}border` as keyof Brand, '--border', targetMap)
    addColor(`${prefix}input` as keyof Brand, '--input', targetMap)
    addColor(`${prefix}ring` as keyof Brand, '--ring', targetMap)
  }

  // Apply Overrides for Light
  mapColors('', lightMap)

  // Apply Overrides for Dark
  mapColors('dark_', darkMap)

  // Convert to CSS string array
  Object.entries(lightMap).forEach(([key, val]) => lightVars.push(`${key}: ${val};`))
  Object.entries(darkMap).forEach(([key, val]) => darkVars.push(`${key}: ${val};`))

  // Radius (Common)
  if (brand.radius) {
    lightVars.push(`--radius: ${brand.radius};`)
    // Dark mode inherits root radius
  }

  // Typography
  if (brand.googleFontsCode && brand.customFontFamily) {
    lightVars.push(`--font-geist-sans: "${brand.customFontFamily}", sans-serif;`)
  } else if (brand.font === 'inter') {
    lightVars.push(`--font-geist-sans: "Inter", sans-serif;`)
  } else if (brand.font === 'roboto') {
    lightVars.push(`--font-geist-sans: "Roboto", sans-serif;`)
  }

  // Raw CSS
  // We'll append this after the :root block
  const rawCss = brand.rawCss || ''

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `:root { ${lightVars.join(' ')} }` }} />
      <style
        dangerouslySetInnerHTML={{ __html: `[data-theme="dark"] { ${darkVars.join(' ')} }` }}
      />
      {rawCss && <style dangerouslySetInnerHTML={{ __html: rawCss }} />}
    </>
  )
}
