const selectedModifier = (isSelected: boolean) => (isSelected ? 'selected' : 'unselected')

export const menuLinkClasses = (isSelected: boolean, type?: 'parent' | 'child' | 'secondary') => {
  const typeModifier = type ? `o-header__drawer-menu-link--${type}` : ''
  return `o-header__drawer-menu-link o-header__drawer-menu-link--${selectedModifier(
    isSelected
  )} ${typeModifier}`
}

export const menuToggleClasses = (isSelected: boolean) => {
  return `o-header__drawer-menu-toggle o-header__drawer-menu-toggle--${selectedModifier(isSelected)}`
}

export const ariaCurrent = (isSelected: boolean) =>
  isSelected
    ? {
        'aria-label': 'Current page',
        'aria-current': true
      }
    : null
