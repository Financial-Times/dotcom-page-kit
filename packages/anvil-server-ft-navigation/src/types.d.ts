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

export type TNavMenuExtra = {
  label: string
  items: TNavMenuItem[]
  url: string
  submenu: TNavMenu | null
}

export type TNavMenuItem = {
  label: string
  url: string
  submenu: TNavMenu | null
  selected?: boolean
  meganav?: TNavMeganv
  items?: TNavMenuItem[]
}

export type TNavCrumbtrail = {
  breadcrumb: {}
  subsections: {}
}

export type TNavMeganv = {
  component: string
  dataset: string
  title: string
  data: any
}
