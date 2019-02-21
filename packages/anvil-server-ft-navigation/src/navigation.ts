import Poller from 'ft-poller'
import httpError from 'http-errors'
import deepFreeze from 'deep-freeze'
import fetch from 'node-fetch'

import { decorateMenu } from '.'

import { TNavMenus, TNavMenu, TOptions } from './types'

const parseData = (data: TNavMenu) => {
  // Makes the navigation data completely immutable,
  // To modify the data, clone the parts you need to change then modify in your app
  return deepFreeze(data)
}

const removeLeadingForwardSlash = (pagePath: string) => {
  return pagePath.charAt(0) === '/' ? pagePath.substring(1) : pagePath
}

const defaults: TOptions = {
  menuUrl: 'http://next-navigation.ft.com/v2/menus',
  crumbtrailUrl: 'http://next-navigation.ft.com/v2/hierarchy',
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

  async getNavigationData(): Promise<TNavMenus> {
    // initialPromise does not resolve any data
    // but it must resolve before `.data` is available to read.
    await this.initialPromise
    return this.poller.getData()
  }

  async getPathMenu(menuId: string, path: string) {
    const data = await this.getNavigationData()
    return decorateMenu(data[menuId], path)
  }

  async getCrumbtrail(currentPath: string) {
    const currentPage = removeLeadingForwardSlash(currentPath)
    const crumbtrail = `${this.options.crumbtrailUrl}/${currentPage}`
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
