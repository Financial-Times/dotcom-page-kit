import menuData from './menus.json'
import middlewareData from './middleware.json'

const { 'drawer-uk': drawer, 'navbar-uk': navbar } = menuData

export const data = {
  showUserNav: false,
  hideOutboundLinks: false,
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showSubNav: true,
  data: {
    ...menuData,
    ...middlewareData,
    drawer,
    navbar
  }
}
