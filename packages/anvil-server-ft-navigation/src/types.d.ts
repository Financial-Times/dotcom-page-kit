export type TNavOptions = {
  menuUrl?: string
  subNavigationUrl?: string
  interval?: number
}

export type TNavMenus = {
  [id: string]: TNavMenu
}

export type TNavMenu = {
  label: string | null
  items: TNavMenuItems
}

export type TNavMenuItem = {
  label: string
  url: string | null
  submenu?: TNavMenu
  selected?: boolean
  meganav?: TNavMeganav[]
}

// Items can be split into separate "columns" by the navigation service
// so we'll receive an array of arrays for some submenus.
export type TNavMenuItems = TNavMenuItem[] | Array<TNavMenuItem[]>

export type TNavMeganav = {
  component: 'sectionlist' | 'articlelist'
  dataset: 'subsections' | 'popular'
  title: string
  data: TNavMenuItems
}

export type TNavSubNavigation = {
  breadcrumb: {}
  subsections: {}
}
