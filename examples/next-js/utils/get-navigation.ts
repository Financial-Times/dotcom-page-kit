import { TNavigationData } from '@financial-times/dotcom-types-navigation'
import { Navigation, TNavOptions } from '@financial-times/dotcom-server-navigation'

export const revalidate = 3600 // revalidate the data at most every hour

export const getNavigationData = async (path: string) => {
  const navOptions: TNavOptions = {}
  const navigation = new Navigation(navOptions)
  const subscribeAction = navigation.getSubscribeAction()
  const menusData = await navigation.getMenusFor(path, 'uk')
  const editions = navigation.getEditionsFor('uk')

  const navigationData: TNavigationData = {
    editions,
    subscribeAction,
    currentPath: path,
    ...menusData
  }

  return navigationData
}
