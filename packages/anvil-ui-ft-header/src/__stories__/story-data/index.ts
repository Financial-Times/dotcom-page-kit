import navbarUk from './navbarUk.json'
import navbarSimple from './navbarSimple.json'
import navbarRight from './navbarRight.json'
import navbarRightAnon from './navbarRightAnon.json'
import drawerUk from './drawerUk.json'
import subNavigation from './subNavigationUk.json'
import editionsUk from './editionsUk.json'
import user from './user.json'

import { THeaderProps } from '../../interfaces'

const breadcrumb = subNavigation.ancestors.concat(subNavigation.item)
const subsections = subNavigation.children

const data: THeaderProps = {
  // property names are consistent with the navigation service data
  showUserNav: false,
  hideOutboundLinks: false,
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showSubNavigation: true,
  disableSticky: true,
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

export default data
