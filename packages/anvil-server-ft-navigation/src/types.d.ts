export type TOptions = {
  menuUrl: string
  crumbtrailUrl: string
  interval: number
}

export type TPollerOptions = {
  url: string
  refreshInterval: number
  parseData: object
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
  submenu: TNavMenu | null
  selected?: boolean
}
