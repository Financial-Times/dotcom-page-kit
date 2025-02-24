import { CSSProperties } from 'react'

export const documentStyles: CSSProperties = {
  // Enable use of 100vw which does not account for the scroll bar
  overflowX: 'hidden',
  backgroundColor: 'var(--o3-color-use-case-page-background, #fff1e5)',
  color: 'var(--o3-color-use-case-body-text, #33302e)'
}
