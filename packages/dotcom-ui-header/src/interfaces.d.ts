import { TNavigationData } from '@financial-times/dotcom-types-navigation'

export type THeaderOptions = {
  variant?: THeaderVariant
  userIsAnonymous?: boolean
  userIsLoggedIn?: boolean
  userIsSubscribed?: boolean
  showSubNavigation?: boolean
  showUserNavigation?: boolean
  showStickyHeader?: boolean
  showMegaNav?: boolean
  showLogoLink?: boolean
  /*
   * experimentalAccountEntryTest is an experimental feature switch
   * This is being run as an AB test and should be removed afterwards
   * This option shouldn't be used by anyone without consulting the CP Retention team first
   */
  experimentalAccountEntryTest?: boolean
}

export type THeaderProps = THeaderOptions & {
  data: TNavigationData
}

export type THeaderVariant = 'simple' | 'large-logo'
