import menuData from './menus.json'
import middlewareData from './middleware.json'

const { 'drawer-uk': drawer, 'navbar-uk': navbar } = menuData

export const navigationProps = {
  ...menuData,
  ...middlewareData,
  drawer,
  navbar
}
