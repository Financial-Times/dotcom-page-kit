import navbarUk from './navbar-uk'
import navbarSimple from './navbar-simple'
import navbarRight from './navbar-right'
import navbarRightAnon from './navbar-right-anon'
import crumbtrail from './crumbtrail-uk'

const breadcrumb = crumbtrail.ancestors.concat(crumbtrail.item)
const subsections = crumbtrail.children

export default {
  userNav: false,
  disableStick: false,
  variant: '',
  hideOutboundLinks: false,
  navbar: navbarUk,
  viewStyle: 'compact',
  userIsAnonymous: false,
  userIsLoggedIn: true,
  'navbar-right': navbarRight,
  'navbar-right-anon': navbarRightAnon,
  'navbar-simple': navbarSimple,
  breadcrumb: breadcrumb,
  subsections: subsections,
  showSubNav: true,
  showSignOut: true
}
