// Shared utilities for Payload Lexical rich text fields
// Keep this minimal and aligned with Payload CMS docs examples

// Valid minimal empty Lexical state (root -> paragraph -> empty text)
export const EMPTY_EDITOR_STATE = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: null,
        children: [
          {
            type: 'text',
            text: '',
            format: '',
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      },
    ],
    direction: null,
  },
} as const

// Ensure we never store an empty string for a Lexical field
export function normalizeRichTextValue<T = any>(value: unknown, fallback: T = EMPTY_EDITOR_STATE as unknown as T): T {
  if (value === '' || typeof value === 'string') return fallback
  return (value as T) ?? fallback
}

