export type TNavMenuKeys =
  | 'account'
  | 'anon'
  | 'drawer-international'
  | 'drawer-uk'
  | 'footer'
  | 'navbar-international'
  | 'navbar-uk'
  | 'navbar-right'
  | 'navbar-right-anon'
  | 'navbar-simple'
  | 'user'

export type TNavMenuKeysByEdition =
  | 'account'
  | 'anon'
  | 'drawer'
  | 'footer'
  | 'navbar'
  | 'navbar-right'
  | 'navbar-right-anon'
  | 'navbar-simple'
  | 'user'

export type TNavMenus = { [key in TNavMenuKeys]: TNavMenu }

export type TNavMenusByEdition = { [key in TNavMenuKeysByEdition]: TNavMenu }

export type TNavMenu = {
  label: string | null
  items: TNavMenuItem[]
}

/** Menu data for the footer will be split into "columns" by the Next navigation API */
export type TNavMenuWithColumns = {
  label: string | null
  items: TNavMenuItem[][]
}

export type TNavMenuItem = {
  label: string
  url: string | null
  submenu?: TNavMenu | TNavMenuWithColumns
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
  breadcrumb: TNavMenuItem[]
  subsections: TNavMenuItem[]
}
