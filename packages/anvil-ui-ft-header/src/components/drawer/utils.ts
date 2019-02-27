const selectedModifier = (isSelected: boolean) => (isSelected ? 'selected' : 'unselected')

export const menuLinkClasses = (isSelected: boolean, type?: 'parent' | 'child' | 'secondary') => {
  const typeModifier = type ? `o-header__drawer-menu-link--${type}` : null
  return `o-header__drawer-menu-link o-header__drawer-menu-link--${selectedModifier(
    isSelected
  )} ${typeModifier}`
}

export const menuToggleClasses = (isSelected: boolean) => {
  return `o-header__drawer-menu-toggle o-header__drawer-menu-toggle--${selectedModifier(isSelected)}`
}

export const isCurrentUrl = (currentUrl: string) => (url: string) => {
  return url === currentUrl
}
