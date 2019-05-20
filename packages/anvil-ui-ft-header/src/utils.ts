export const ariaSelected = (item) => {
  return item.selected ? { 'aria-label': `Current page ${item.label}`, 'aria-current': true } : null
}
