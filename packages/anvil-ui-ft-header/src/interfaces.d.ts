export interface Props {
  options: Options
  data: Data
}

interface Options {
  userNav: boolean
  disableSticky: boolean
  variant: string
  hideOutboundLinks?: boolean
  userIsAnonymous: boolean
  userIsLoggedIn: boolean
  showSubNav: boolean
  showSignOut: boolean
}

interface Data {
  drawer: any
  navbar: any
  'navbar-right': any
  'navbar-right-anon': any
  'navbar-simple': any
  breadcrumb: any
  subsections: any
}

export type NavListProps = {
  navbarOptions: any[]
  variant?: string
}
