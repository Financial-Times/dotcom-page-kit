import { TNavMenu, TNavMenuItem } from './types'

const decorateURL = (url: string, currentPath: string): string => {
  if (url && url.includes('${currentPath}')) {
    // Don't replace the URL placeholder with a barrier or error URL so that
    // a user logging in is not redirected to a barrier or error!
    const shouldReplace = !/\/(products|barriers|errors)/.test(currentPath)
    const redirectPath = shouldReplace ? currentPath : '%2F'
    return url.replace('${currentPath}', redirectPath)
  }

  return url
}

const isSelected = (url: string, currentPath: string): boolean => {
  return url === currentPath
}

function decorateMenuItem(item: TNavMenuItem, currentPath: string) {
  item.url = decorateURL(item.url, currentPath)
  item.selected = isSelected(item.url, currentPath)
}

function cloneMenu(value: any, currentPath: string): any {
  if (Array.isArray(value)) {
    return value.map((item) => cloneMenu(item, currentPath))
  }

  if (Object(value) === value) {
    const cloned = {}

    for (const key of Object.keys(value)) {
      cloned[key] = cloneMenu(value[key], currentPath)
    }

    if (cloned.hasOwnProperty('url')) {
      decorateMenuItem(cloned as TNavMenuItem, currentPath)
    }

    return cloned
  }

  return value
}

export const decorateMenu = (menu: TNavMenu, currentUrl: string): TNavMenu => {
  return cloneMenu(menu, currentUrl)
}
