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
        const shouldReplace = !currentPathName || !/\/(products|barriers|errors)/.test(currentPathName)
        const redirectPath = shouldReplace ? currentUrl : '%2F'
        url = url.replace('${currentPath}', redirectPath)
      }

      if (url === currentPathName) {
        selected = true
      }

      if (submenu) {
        submenu = decorateMenu(submenu, currentUrl)
      }

      acc.push({ label, url, submenu, selected })

      return acc
    }, [])
  }
}
