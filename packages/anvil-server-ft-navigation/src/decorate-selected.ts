import url from 'url'

import { TNavMenu, TNavMenuItem } from './types'

/**
 * Produce a decorated clone of the supplied menu
 *
 * @param menu
 * @param currentUrl
 */
export const decorateMenu = ({ label, items }: TNavMenu, currentUrl: string) => {
  const currentPathName = url.parse(currentUrl).pathname

  return {
    label,
    items: items.reduce((acc, { label, url, submenu }: TNavMenuItem) => {
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

      // Only add the selected property if true
      return [...acc, selected ? { label, url, submenu, selected } : { label, url, submenu }]
    }, [])
  }
}
