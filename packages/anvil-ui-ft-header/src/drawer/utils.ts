import cc from 'classcat'

const getModifier = (isSelected: boolean) => (isSelected ? 'selected' : 'unselected')

export const menuLinkClass = (isSelected: boolean, type?: 'parent' | 'child' | 'secondary') => {
  return cc([
    'o-header__drawer-menu-link',
    `o-header__drawer-menu-link--${getModifier(isSelected)}`,
    {
      [`o-header__drawer-menu-link--${type}`]: !!type
    }
  ])
}

export const menuToggleClass = (isSelected: boolean) => {
  return cc(['o-header__drawer-menu-toggle', `o-header__drawer-menu-toggle--${getModifier(isSelected)}`])
}

export const aria = (isSelected: boolean) =>
  isSelected
    ? {
        'aria-label': 'Current page',
        'aria-current': true
      }
    : null

export const isCurrentUrl = (currentUrl: string) => (url: string) => {
  return url === currentUrl
}
