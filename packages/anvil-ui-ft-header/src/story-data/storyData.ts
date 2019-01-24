import navbarUk from './navbar-uk'
import navbarRight from './navbar-right'
import navbarRightAnon from './navbar-right-anon'
import crumbtrail from './crumbtrail-uk'

const breadcrumb = crumbtrail.ancestors.concat(crumbtrail.item)
const subsections = crumbtrail.children

export default {
  userNav: true,
  'navbar-uk': navbarUk,
  'navbar-right': navbarRight,
  'navbar-right-anon': navbarRightAnon,
  breadcrumb: breadcrumb,
  subsections: subsections,
  showSubNav: true,
  showSignOut: true
}
