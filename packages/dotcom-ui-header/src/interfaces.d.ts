import { TNavigationData } from '@financial-times/dotcom-types-navigation'
import type { EnhancedSearchBarProps } from '@financial-times/enhanced-search-suggestions'

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
  enhancedSearchProps?: Omit<EnhancedSearchBarProps, 'type' | 'instance'>
}

export type THeaderProps = THeaderOptions & {
  data: TNavigationData
}

export type THeaderVariant = 'simple' | 'large-logo'
