import navbarUk from './navbarUk.json'
import navbarSimple from './navbarSimple.json'
import navbarRight from './navbarRight.json'
import navbarRightAnon from './navbarRightAnon.json'
import drawerUk from './drawerUk.json'
import crumbtrail from './crumbtrailUk.json'
import editionsUk from './editionsUk.json'
import user from './user.json'

const breadcrumb = crumbtrail.ancestors.concat(crumbtrail.item)
const subsections = crumbtrail.children

export default {
  // property names are consistent with the navigation service data
  options: {
    currentUrl: '/',
    userNav: false,
    disableSticky: false,
    hideOutboundLinks: false,
    userIsAnonymous: false,
    userIsLoggedIn: true,
    showSubNav: true,
    showSignOut: true
  },
  data: {
    navbar: navbarUk,
    'navbar-right': navbarRight,
    'navbar-right-anon': navbarRightAnon,
    'navbar-simple': navbarSimple,
    drawer: drawerUk,
    breadcrumb,
    subsections,
    editions: editionsUk,
    user
  }
}
