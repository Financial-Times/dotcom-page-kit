export interface Props {
  userNav: boolean // Show the `sign in` and `subscribe` links to anonymous users.
  hideOutboundLinks?: boolean // An iOS setting - removes link functionality from header and hides footer.
  viewStyle?: string // Set the header top style to default|compact - the only currently avialable value = 'compact'.
  navbar: any // Navigation data - either UK or International
  'navbar-right': any // Navigation data - signed in users
  'navbar-right-anon': any // Navigation data - for anonymous users
  breadcrumb: any // Crumbtrail data
  subsections: any // Crumbtrail data
  showSubNav: boolean
  showSignOut: boolean // A myFT option - Adds a Sign out link to the crumbtrail element
  userIsAnonymous?: boolean // Marks a user as anonymous - set in n-express
  userIsLoggedIn?: boolean // Marks a user as signed in - set in n-express
}
