import { TNavMenusForEdition, TNavSubNavigation, TNavEditions } from '@financial-times/anvil-types-navigation'

export interface THeaderProps {
  variant?: THeaderVariant
  hideOutboundLinks?: boolean
  userIsAnonymous?: boolean
  userIsLoggedIn?: boolean
  showSubNavigation?: boolean
  showUserNavigation?: boolean
  disableSticky?: boolean
  data: TNavMenusForEdition &
    TNavSubNavigation & {
      editions: TNavEditions
      currentPath?: string
    }
}

export type THeaderVariant = 'simple' | 'home' | 'sticky' | 'logo-only'
