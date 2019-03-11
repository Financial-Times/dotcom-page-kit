export type TNavOptions = {
  menuUrl?: string
  crumbtrailUrl?: string
  interval?: number
}

export type TNavMenus = {
  [menuId: string]: TNavMenu
}

export type TNavMenu = {
  label: string
  items: TNavMenuItem[]
}

export type TNavMenuItem = {
  label: string
  url: string
  submenu?: TNavMenu | null
  selected?: boolean
  meganav?: TNavMeganav
  items?: TNavMenuItem[]
}

export type TNavCrumbtrail = {
  breadcrumb: {}
  subsections: {}
}

export type TNavMeganav = {
  component: string
  dataset: string
  title: string
  data: TNavMenuItem[] | Array<TNavMenuItem[]>
}
