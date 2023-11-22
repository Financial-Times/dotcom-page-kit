import {
  TNavMenu,
  TNavMenuKeys,
  TNavMenus,
  TNavMenusForEdition
} from '@financial-times/dotcom-types-navigation'

const sharedMenuKeys: TNavMenuKeys[] = [
  'account',
  'anon',
  'footer',
  'navbar-simple',
  'navbar-right',
  'navbar-right-anon',
  'user'
]

type SharedMenuKeys = (typeof sharedMenuKeys)[number]

export function selectMenuDataForEdition(menuData: TNavMenus, currentEdition: string): TNavMenusForEdition {
  const output = {
    navbar: menuData[`navbar-${currentEdition}` as TNavMenuKeys],
    drawer: menuData[`drawer-${currentEdition}` as TNavMenuKeys]
  } as { [K in SharedMenuKeys]?: TNavMenu }

  for (const key of sharedMenuKeys) {
    if (menuData[key]) {
      output[key] = menuData[key]
    }
  }

  return output as TNavMenusForEdition
}
