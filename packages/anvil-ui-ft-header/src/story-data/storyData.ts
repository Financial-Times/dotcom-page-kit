import navbarUk from './navbarUk.json'
import navbarSimple from './navbarSimple.json'
import navbarRight from './navbarRight.json'
import navbarRightAnon from './navbarRightAnon.json'
import crumbtrail from './crumbtrailUk.json'

const breadcrumb = crumbtrail.ancestors.concat(crumbtrail.item)
const subsections = crumbtrail.children

export default {
  // Options
  userNav: false,
  disableStick: false,
  variant: '',
  hideOutboundLinks: false,
  viewStyle: 'compact',
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showSubNav: true,
  showSignOut: true,

  // Data
  navbar: navbarUk,
  'navbar-right': navbarRight,
  'navbar-right-anon': navbarRightAnon,
  'navbar-simple': navbarSimple,
  breadcrumb: breadcrumb,
  subsections: subsections
}
