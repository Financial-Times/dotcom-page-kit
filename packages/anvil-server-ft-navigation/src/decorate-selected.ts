import url from 'url'

/**
 * Add a `selected` attribute to `item`s whose url matches `currentUrl`
 *
 * @param navMenu
 * @param currentUrl
 */
export const decorateSelected = (navMenu: TNavMenu, currentUrl: string) => {
  // const clone = 
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
