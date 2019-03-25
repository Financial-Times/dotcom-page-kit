import menuData from './menus.json'
import middlewareData from './middleware.json'

const {
  'drawer-uk': drawer,
  'navbar-uk': navbar,
  'navbar-right': navbarRight,
  'navbar-right-anon': navbarRightAnon,
  'navbar-simple': navbarSimple
} = menuData

const { editions, breadcrumb, subsections } = middlewareData

export const data = {
  showUserNav: false,
  hideOutboundLinks: false,
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showSubNav: true,
  data: {
    navbar,
    navbarRight,
    navbarRightAnon,
    navbarSimple,
    drawer,
    editions,
    breadcrumb,
    subsections
  }
}
