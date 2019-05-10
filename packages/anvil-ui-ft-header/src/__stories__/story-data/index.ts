import navbarUK from './navbarUK'
import navbarSimple from './navbarSimple'
import navbarRight from './navbarRight'
import navbarRightAnon from './navbarRightAnon'
import drawerUK from './drawerUK'
import subNavigation from './subNavigationUK'
import editionsUK from './editionsUK'
import user from './user'

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
    account: null,
    anon: null,
    breadcrumb,
    drawer: drawerUK,
    editions: editionsUK,
    footer: null,
    navbar: navbarUK,
    'navbar-right': navbarRight,
    'navbar-right-anon': navbarRightAnon,
    'navbar-simple': navbarSimple,
    subsections,
    user
  }
}

export default data
