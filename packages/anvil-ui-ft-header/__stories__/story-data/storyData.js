'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var navbarUk_json_1 = __importDefault(require('./navbarUk.json'))
var navbarSimple_json_1 = __importDefault(require('./navbarSimple.json'))
var navbarRight_json_1 = __importDefault(require('./navbarRight.json'))
var navbarRightAnon_json_1 = __importDefault(require('./navbarRightAnon.json'))
var drawerUk_json_1 = __importDefault(require('./drawerUk.json'))
var crumbtrailUk_json_1 = __importDefault(require('./crumbtrailUk.json'))
var editionsUk_json_1 = __importDefault(require('./editionsUk.json'))
var user_json_1 = __importDefault(require('./user.json'))
var breadcrumb = crumbtrailUk_json_1.default.ancestors.concat(crumbtrailUk_json_1.default.item)
var subsections = crumbtrailUk_json_1.default.children
exports.default = {
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
    navbar: navbarUk_json_1.default,
    'navbar-right': navbarRight_json_1.default,
    'navbar-right-anon': navbarRightAnon_json_1.default,
    'navbar-simple': navbarSimple_json_1.default,
    drawer: drawerUk_json_1.default,
    breadcrumb: breadcrumb,
    subsections: subsections,
    editions: editionsUk_json_1.default,
    user: user_json_1.default
  }
}
