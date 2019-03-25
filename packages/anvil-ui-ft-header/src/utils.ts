export const ariaSelected = (item) => {
  return item.selected ? { 'aria-label': 'Current page', 'aria-current': true } : null
}
