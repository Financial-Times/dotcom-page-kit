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
  showAskButton?: boolean
  showProNavigation?: boolean
}

export type THeaderProps = THeaderOptions & {
  data: TNavigationData
  metadata?: {
    flagProNavigation: string | undefined 
  }
}

export type THeaderVariant = 'simple' | 'large-logo' | 'sticky'
