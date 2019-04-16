import { parse } from 'url'
import { TNavMenu, TNavMenuItems, TNavMenuItem } from './types'

const decorateUrl = (itemUrl, currentUrl, currentPathName) => {
  if (typeof itemUrl === 'string' && itemUrl.includes('${currentPath}')) {
    const shouldReplace = !currentPathName || !/\/(products|barriers|errors)/.test(currentPathName)
    const redirectPath = shouldReplace ? currentUrl : '%2F'
    return itemUrl.replace('${currentPath}', redirectPath)
  }
  return itemUrl
}

const isSelected = (url, currentPathName) => {
  return url === currentPathName
}

const decorateItem = (url, currentUrl) => {
  const currentPathName = parse(currentUrl).pathname
  const itemUrl = decorateUrl(url, currentUrl, currentPathName)
  let selected = isSelected(url, currentPathName)
  return { itemUrl, selected }
}

export const processDataItems = (dataItem, currentUrl) => {
  if (Array.isArray(dataItem)) {
    return dataItem.map((item) => processDataItems(item, currentUrl))
  } else {
    const { itemUrl, selected } = decorateItem(dataItem.url, currentUrl)
    return { ...dataItem, url: itemUrl, selected }
  }
}

export const processMeganav = (meganav, currentUrl) => {
  return meganav.map((component) => {
    return {
      component: component.component,
      title: component.title,
      data: component.data.map((dataItems) => processDataItems(dataItems, currentUrl))
    }
  })
}

const processItems = (items: TNavMenuItems, currentUrl: string) => {
  return items.reduce((acc: TNavMenuItems, { label, url, submenu, meganav }: TNavMenuItem) => {
    const { itemUrl, selected } = decorateItem(url, currentUrl)

    if (submenu) {
      submenu = decorateMenu(submenu, currentUrl)
    }

    /**
     * Meganav data is appended to the navigation object by next-api
     * and present in the response from anvil-server-ft-navigation.
     *
     * It can't be processed by decorateMenu() as it has an atypical structure.
     * Note also that the nesting is variable and the .data property may contain
     * dataItems or a nested array of dataItems.
     */
    if (meganav) {
      meganav = processMeganav(meganav, currentUrl)
    }

    acc.push({ label, url: itemUrl, submenu, selected, meganav })

    return acc
  }, [])
}

/**
 * Produce a decorated clone of the supplied menu
 * The `items.every` handles menu['footer']: a array of TNavMenuItems arrays
 *
 * @param menu
 * @param currentUrl
 */
export const decorateMenu = ({ label, items }, currentUrl: string): TNavMenu => {
  return {
    label,
    items: items.every(Array.isArray)
      ? items.map((itemArr: TNavMenuItems) => processItems(itemArr, currentUrl))
      : processItems(items, currentUrl)
  }
}
