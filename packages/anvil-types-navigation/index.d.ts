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

export type TNavigationData =
  TNavMenusForEdition &
  TNavSubNavigation & {
    editions: TNavEditions
    currentPath?: string
  }

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

export type TNavMeganav = INavMeganavSections | INavMeganavArticles

export interface INavMeganavSections {
  component: 'sectionlist'
  dataset: 'subsections'
  title: string
  /** This data has been split into "columns" by the Next navigation API */
  data: TNavMenuItem[][]
}

export interface INavMeganavArticles {
  component: 'articlelist'
  dataset: 'popular'
  title: string
  data: TNavMenuItem[]
}

export type TNavSubNavigation = {
  breadcrumb?: TNavMenuItem[]
  subsections?: TNavMenuItem[]
}

export type TNavEditions = {
  current: { name: string }
  others: TNavEdition[]
}

export type TNavEdition = {
  name: string
  id: string
  url: string
}
