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

export type TNavMenuKeysForEdition =
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

export type TNavMenusForEdition = { [key in TNavMenuKeysForEdition]: TNavMenu }

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
  disableTracking?: boolean
}

export type TNavMeganav = {
  component: 'sectionlist' | 'articlelist'
  dataset: 'subsections' | 'popular'
  title: string
  data: TNavMenuItem[] | TNavMenuItem[][]
}

export type TNavSubNavigation = {
  breadcrumb: TNavMenuItem[]
  subsections: TNavMenuItem[]
}
