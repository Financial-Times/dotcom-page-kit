import Poller from 'ft-poller'
import httpError from 'http-errors'
import deepFreeze from 'deep-freeze'
import fetch from 'node-fetch'

import { decorateMenu } from '.'

import { TNavMenus, TNavMenu, TNavOptions, TNavCrumbtrail } from './types'

/**
 * Makes the navigation data completely immutable,
 * To modify the data, clone the parts you need to change then modify in your app
 *
 * @param data
 */
const parseData = (data: any) => {
  return deepFreeze(data)
}

const removeLeadingForwardSlash = (pagePath: string) => {
  return pagePath.charAt(0) === '/' ? pagePath.substring(1) : pagePath
}

const defaults: TNavOptions = {
  menuUrl: 'http://next-navigation.ft.com/v2/menus',
  subNavigationUrl: 'http://next-navigation.ft.com/v2/hierarchy',
  interval: 15 * 60 * 1000 // poll every 15 minutes
}

export class Navigation {
  public options
  public poller
  public initialPromise: Promise<void>

  constructor(options = {}) {
    this.options = { ...defaults, ...options }

    this.poller = new Poller({
      url: this.options.menuUrl,
      refreshInterval: this.options.interval,
      parseData
    })

    this.initialPromise = this.poller.start({ initialRequest: true })
  }

  private async _getNavigationData(): Promise<TNavMenus> {
    // initialPromise does not return data but must resolve before `getData` can be called
    await this.initialPromise
    return this.poller.getData()
  }

  async getMenuData(path: string): Promise<TNavMenus> {
    const data = await this._getNavigationData()
    return Object.entries(data).reduce((acc, [menuId, menu]) => {
      acc[menuId] = decorateMenu(menu, path)
      return acc
    }, {})
  }

  async getPathMenu(menuId: string, path: string = '/'): Promise<TNavMenu> {
    const data = await this._getNavigationData()
    return decorateMenu(data[menuId], path)
  }

  async getCrumbtrail(path: string): Promise<TNavCrumbtrail> {
    const currentPage = removeLeadingForwardSlash(path)
    const crumbtrail = `${this.options.subNavigationUrl}/${currentPage}`
    const response = await fetch(crumbtrail)

    if (response.ok) {
      const data = await response.json()
      return {
        breadcrumb: parseData(data.ancestors.concat(data.item)),
        subsections: parseData(data.children)
      }
    } else {
      throw httpError(response.status, `Navigation crumbtrail for ${currentPage} could not be found.`)
    }
  }
}
