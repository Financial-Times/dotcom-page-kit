import { parse } from 'url'

import { TNavMenu, TNavMenuItem } from './types'

const decorateUrl = (itemUrl, currentUrl, currentPathName) => {
  if (typeof itemUrl === 'string' && itemUrl.includes('${currentPath}')) {
    const shouldReplace = !currentPathName || !/\/(products|barriers|errors)/.test(currentPathName)
    const redirectPath = shouldReplace ? currentUrl : '%2F'
    return itemUrl.replace('${currentPath}', redirectPath)
  }
  return itemUrl
}

const isSelected = (url, currentPathName) => {
  return url === currentPathName ? true : false
}

const decorateItem = (url, currentUrl, label) => {
  const currentPathName = parse(currentUrl).pathname
  const itemUrl = decorateUrl(url, currentUrl, currentPathName)
  let selected = isSelected(url, currentPathName)
  return label
    ? { itemUrl, selected, label }
    : { itemUrl, selected }
}

export const processDataItems = (dataItems, currentUrl) => {
  return Array.isArray(dataItems)
    ? dataItems.map((dataItem) => {
        return decorateItem(dataItem.url, currentUrl, dataItem.label)
      })
    : decorateItem(dataItems.url, currentUrl, dataItems.label)
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

/**
 * Produce a decorated clone of the supplied menu
 *
 * @param menu
 * @param currentUrl
 */

export const decorateMenu = ({ label, items }: TNavMenu, currentUrl: string): TNavMenu => {
  return {
    label,
    items: items.reduce((acc, { label, url, submenu, meganav }: TNavMenuItem) => {
      const { itemUrl, selected } = decorateItem(url, currentUrl, null)

      if (submenu) {
        submenu = decorateMenu(submenu, currentUrl)
      }

      if (meganav) {
        meganav = processMeganav(meganav, currentUrl)
      }

      acc.push({ label, url: itemUrl, submenu, selected, meganav })

      return acc
    }, [])
  }
}
