import { TNavMenu } from '@financial-times/anvil-server-ft-navigation'

export type TPrimaryLinks = {
  navbar: TNavMenu
  drawer: TNavMenu
}

export type TMenuKeys =
  | 'account'
  | 'user'
  | 'anon'
  | 'footer'
  | 'navbar-simple'
  | 'navbar-right'
  | 'navbar-right-anon'

export type TNavigationLinks = TPrimaryLinks & { [key in TMenuKeys]?: TNavMenu }
