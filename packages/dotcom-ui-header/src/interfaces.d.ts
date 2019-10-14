import { TNavigationData } from '@financial-times/dotcom-types-navigation'

export type THeaderOptions = {
  userIsAnonymous?: boolean
  userIsLoggedIn?: boolean
  showSubNavigation?: boolean
  showUserNavigation?: boolean
  disableSticky?: boolean
}

export type THeaderProps = THeaderOptions & {
  data: TNavigationData
}
