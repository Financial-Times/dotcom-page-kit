export interface Props {
  options: {
    currentUrl: string
    userNav: boolean
    disableSticky: boolean
    variant: string
    hideOutboundLinks: boolean
    userIsAnonymous: boolean
    userIsLoggedIn: boolean
    showSubNav: boolean
    showSignOut: boolean
  }
  data: {
    editionsUk: TEditions
    editionsInternational: TEditions
    drawer: TItemSubMenu
    navbar: TNavbarProps
    'navbar-right': TNavbarProps
    'navbar-right-anon': TNavbarProps
    'navbar-simple': TNavbarProps
    breadcrumb: any
    subsections: any
    user: TUserMenu
  }
}

export interface TItemSubMenu {
  label: string | null
  items: TItem[]
}
export interface TItem {
  label: string | null
  url: string | null
  submenu?: TItemSubMenu | null
  selected?: boolean
}

export type TNavbarProps = {
  label: string
  items: TItem[]
}

export type TUserMenu = {
  label: string
  items: TItem[]
}

export type NavListProps = {
  navbarOptions: any[]
  variant?: string
}

export interface IDrawerParent {
  props: TItem
  index?
}

export type TEditions = {
  current: { name: string }
  others: TEdition[]
}

export type TEdition = {
  name: string
  id: string
  url: string
}
