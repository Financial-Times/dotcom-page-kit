import {
  TNavigationData,
  TNavMenusForEdition,
  TNavSubNavigation,
  TNavEditions
} from '@financial-times/anvil-types-navigation'

export type THeaderOptions = {
  variant?: THeaderVariant
  userIsAnonymous?: boolean
  userIsLoggedIn?: boolean
  showSubNavigation?: boolean
  showUserNavigation?: boolean
  disableSticky?: boolean
}

export type THeaderProps = THeaderOptions & {
  data: TNavigationData
}

export type THeaderVariant = 'simple' | 'large-logo'
