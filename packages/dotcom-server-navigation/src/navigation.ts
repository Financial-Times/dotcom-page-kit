import Poller from 'ft-poller'
import httpError from 'http-errors'
import deepFreeze from 'deep-freeze'
import fetch from 'node-fetch'
import {
  TNavMenus,
  TNavMenusForEdition,
  TNavSubNavigation,
  TNavEditions,
  TNavAction
} from '@financial-times/dotcom-types-navigation'
import { selectMenuDataForEdition } from './selectMenuDataForEdition'
import { decorateMenuData } from './decorateMenuData'
import { getEditions, isEdition } from './editions'
import { getSubscribeAction } from './actions'

// Makes the navigation data completely immutable,
// To modify the data, clone the parts you need to change then modify in your app
const parseData = (data: any) => {
  return deepFreeze(data)
}

const removeLeadingForwardSlash = (pagePath: string) => {
  return pagePath.charAt(0) === '/' ? pagePath.substring(1) : pagePath
}

export type TNavOptions = {
  menuUrl?: string
  subNavigationUrl?: string
  interval?: number
}

const defaults: TNavOptions = {
  menuUrl: 'http://next-navigation.ft.com/v2/menus',
  subNavigationUrl: 'http://next-navigation.ft.com/v2/hierarchy',
  interval: 15 * 60 * 1000 // poll every 15 minutes
}

export class Navigation {
  public options: TNavOptions
  public poller: Poller
  public initialPromise: Promise<void>
  private menuData: TNavMenus

  constructor(options: TNavOptions = {}) {
    this.options = { ...defaults, ...options }

    this.poller = new Poller({
      url: this.options.menuUrl,
      refreshInterval: this.options.interval,
      parseData
    })

    this.initialPromise = this.poller.start({ initialRequest: true })
  }

  async getMenusData(): Promise<TNavMenus> {
    // initialPromise does not return data but must resolve before `getData` can be called
    await this.initialPromise

    this.menuData = this.poller.getData()

    return this.menuData

  }

  async getMenusFor(currentPath: string, currentEdition: string = 'uk'): Promise<TNavMenusForEdition> {
    const menusData = await this.getMenusData()
    const menusForEdition = selectMenuDataForEdition(menusData, currentEdition)

    return decorateMenuData(menusForEdition, currentPath)
  }

  async getSubNavigationFor(path: string): Promise<TNavSubNavigation> {
    const currentPage = removeLeadingForwardSlash(path)
    const subNavigation = `${this.options.subNavigationUrl}/${currentPage}`
    const response = await fetch(subNavigation)

    if (response.ok) {
      const data = await response.json()

      const currentItem = { ...data.item, selected: true }

      return {
        breadcrumb: data.ancestors.concat(currentItem),
        subsections: data.children
      }
    } else {
      throw httpError(response.status, `Sub-navigation for ${currentPage} could not be found.`)
    }
  }

  getEditionsFor(currentEdition: string = 'uk'): TNavEditions {
    if (isEdition(currentEdition)) {
      return getEditions(currentEdition)
    } else {
      throw httpError(400, `The provided edition "${currentEdition}" is not a valid edition`)
    }
  }

  getSubscribeAction(): TNavAction {
    return getSubscribeAction()
  }
}
