type TOptions = {
  menuUrl: string
  crumbtrailUrl: string
  interval: number
}

type TPollerOptions = {
  url: string
  refreshInterval: number
  parseData: object
}

type TNavMenus = {
  [menuId: string]: TNavMenu
}

type TNavMenu = {
  label: string
  items: TNavMenuItem[]
}

type TNavMenuItem = {
  label: string
  url: string
  submenu: TNavMenu | null
  selected: boolean
}
