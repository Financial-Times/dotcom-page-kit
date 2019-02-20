import url from 'url'

import { TNavMenu, TNavMenuItem } from './types'

/**
 * Add a `selected` attribute to `item`s whose url matches `currentUrl`
 *
 * @param navMenu
 * @param currentUrl
 */
export const decorateSelected = (navMenu: TNavMenu, currentUrl: string) => {
  const currentPathName = url.parse(currentUrl).pathname

  for (let item of navMenu.items) {
    if (typeof item.url === 'string' && item.url.includes('${currentPath}')) {
      const shouldRedirect = !currentPathName || !/\/(products|barriers|errors)/.test(currentPathName)
      const redirectPath = shouldRedirect ? currentUrl : '%2F'
      item.url = item.url.replace('${currentPath}', redirectPath)
    }

    if (item.url === currentPathName) {
      item.selected = true
    }

    if (item.submenu) {
      decorateSelected(item.submenu, currentUrl)
    }
  }
}

export const decorateMenu = (navMenu: TNavMenu, currentUrl?: string) => {
  const currentPathName = currentUrl ? url.parse(currentUrl).pathname : false

  return {
    label: navMenu.label,
    items: navMenu.items.reduce((acc, { label, url, submenu }: TNavMenuItem) => {
      let selected = false

      if (typeof url === 'string' && url.includes('${currentPath}')) {
        const shouldRedirect = !currentPathName || !/\/(products|barriers|errors)/.test(currentPathName)
        const redirectPath = shouldRedirect ? currentUrl : '%2F'
        url = url.replace('${currentPath}', redirectPath)
      }

      if (url === currentPathName) {
        selected = true
      }

      if (submenu) {
        submenu = decorateMenu(submenu, currentUrl)
      }

      return [...acc, selected ? { label, url, submenu, selected } : { label, url, submenu }]
    }, [])
  }
}
