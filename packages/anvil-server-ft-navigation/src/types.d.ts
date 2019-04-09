export type TNavOptions = {
  menuUrl?: string
  subNavigationUrl?: string
  interval?: number
}

export type TNavMenus = {
  [menuId: string]: TNavMenu
}

type TNavMenuItems = TNavMenuItem[]

export type TNavMenu = {
  label: string
  items: TNavMenuItems
}

export type TNavMenuItem = {
  label: string
  url: string
  submenu: TNavMenu
  selected?: boolean
  meganav?: TNavMeganav
  items?: TNavMenuItems
}

export type TNavCrumbtrail = {
  breadcrumb: {}
  subsections: {}
}

export type TNavMeganav = {
  component: string
  dataset: string
  title: string
  data: TNavMenuItems
}
