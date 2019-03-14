export interface Props {
  options: {
    userNav?: boolean
    variant?: string
    hideOutboundLinks?: boolean
    userIsAnonymous?: boolean
    userIsLoggedIn: boolean
    showSubNav: boolean
    showSignOut: boolean
  }
  data: {
    editions: TEditions
    drawer: TItemSubMenu
    navbar: TItemSubMenu
    'navbar-right': TItemSubMenu
    'navbar-right-anon': TItemSubMenu
    'navbar-simple': TItemSubMenu
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
