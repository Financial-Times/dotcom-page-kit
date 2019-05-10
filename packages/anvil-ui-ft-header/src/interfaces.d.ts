import { TNavMenusForEdition, TNavMenuItem } from '@financial-times/anvil-types-navigation'

export interface THeaderProps {
  variant?: THeaderVariant
  hideOutboundLinks?: boolean
  userIsAnonymous?: boolean
  userIsLoggedIn?: boolean
  showUserNav?: boolean
  showSubNavigation?: boolean
  disableSticky?: boolean
  data: TNavMenusForEdition & {
    breadcrumb?: TNavMenuItem[]
    subsections?: TNavMenuItem[]
    editions: TEditions
    currentPath?: string
  }
}

export type THeaderVariant = 'simple' | 'home' | 'sticky' | 'logo-only'

// export interface TItemSubMenu {
//   label: string | null
//   items: TItem[]
// }
// export interface TItem {
//   label: string | null
//   url: string | null
//   submenu?: TItemSubMenu | null
//   selected?: boolean
// }

// export type TUserMenu = {
//   label: string
//   items: TItem[]
// }

// export type NavListProps = {
//   navbarOptions: any[]
//   variant?: string
// }

// export interface IDrawerParent {
//   props: TItem
//   index?
// }

export type TEditions = {
  current: { name: string }
  others: TEdition[]
}

export type TEdition = {
  name: string
  id: string
  url: string
}
