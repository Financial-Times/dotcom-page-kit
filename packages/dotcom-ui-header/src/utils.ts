import { HTMLAttributes } from 'react'

export const ariaSelected = (item): HTMLAttributes<HTMLElement> | null => {
  return item.selected ? { 'aria-label': `${item.label}, current page`, 'aria-current': 'page' } : null
}
