import { TNavMenuKeys, TNavMenus, TNavMenusForEdition } from '@financial-times/anvil-types-navigation'

const sharedMenuKeys: TNavMenuKeys[] = [
  'account',
  'anon',
  'footer',
  'navbar-simple',
  'navbar-right',
  'navbar-right-anon',
  'user'
]

export function selectMenuDataForEdition(menuData: TNavMenus, currentEdition: string): TNavMenusForEdition {
  const output = {
    navbar: menuData[`navbar-${currentEdition}`],
    drawer: menuData[`drawer-${currentEdition}`]
  }

  for (const key of sharedMenuKeys) {
    if (menuData[key]) {
      output[key] = menuData[key]
    }
  }

  return output as TNavMenusForEdition
}
