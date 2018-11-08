import Poller from 'ft-poller'
import deepFreeze from 'deep-freeze'
import { getDefaultData } from './getDefaultData'

const defaultPollerData = '../../src/defaultData.json'
const DATA_URL = 'http://next-navigation.ft.com/v2/menus'
const CRUMBTRAIL_URL = 'http://next-navigation.ft.com/v2/hierarchy'

const parseData = (data: object) => {
  // Makes the navigation data completely immutable,
  // To modify the data, clone the parts you need to change then modify in your app
  return deepFreeze(data)
}

export class NavigationPoller {
  public poller
  public crumbtrailUrl

  constructor() {
    ;(this.poller = new Poller({
      url: DATA_URL,
      refreshInterval: 15 * 60 * 1000,
      defaultData: getDefaultData(defaultPollerData),
      autostart: true,
      parseData
    })),
      (this.crumbtrailUrl = CRUMBTRAIL_URL)
  }

  getData() {
    return this.poller.getData()
  }

  getCrumbtrail(currentPage) {
    let crumbtrail = this.crumbtrailUrl + currentPage
    fetch(crumbtrail).then((response) => {
      return response.ok
        ? response.json()
        : Promise.reject({
            event: 'FETCHING_NAVIGATION_CRUMBTRAIL_FAILED',
            status: response.status,
            url: crumbtrail
          })
    })
  }
}
