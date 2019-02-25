import React from 'react'

const StickyHeader = (props) => {
  return (
    <header
      id="site-navigation"
      className={`o-header o-header--${props.options.variant} o-header--sticky`}
      data-o-component="o-header"
      data-o-header--no-js={true}
      data-o-header--sticky
      tabIndex={-1}>
      {props.children}
    </header>
  )
}

const DrawerIconSticky = () => (
  <a
    href="#o-header-drawer"
    className="o-header__top-link o-header__top-link--menu"
    aria-controls="o-header-drawer"
    title="Open drawer menu"
    aria-label="Open drawer menu"
    data-trackable="drawer-toggle"
    tabindex="-1">
    <span className="o-header__top-link-label">Menu</span>
  </a>
)

const SearchIconSticky = ({ context }) => (
  <a
    href={`o-header-search-${context}`}
    className="o-header__top-link o-header__top-link--search"
    aria-controls={`o-header-search-${context}`}
    title="Search"
    aria-label="Search"
    data-trackable="search-toggle"
    tabindex="-1">
    <span className="o-header__top-link-label">Search</span>
  </a>
)

const Navigation = (props) => {
  const navItems = props.data.navbar.items
  return (
    <div class="o-header__top-takeover">
      <div class="o-header__nav">
        <ul class="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
          {navItems.map((navItem, index) => {
            const ariaAttributes = navItem.selected
              ? { 'aria-label': 'Current page', 'aria-current': true }
              : null
            return (
              <li className="o-header__nav-item" key={`link-${index}`}>
                <a
                  className="o-header__nav-link o-header__nav-link--primary"
                  href={navItem.url}
                  id={`o-header-link-${index}`}
                  {...ariaAttributes}
                  data-trackable={navItem.label}
                  tabindex="-1">
                  {navItem.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const Logo = () => (
  <a
    class="o-header__top-logo o-header__hide--L"
    data-trackable="logo"
    href="/"
    title="Go to Financial Times homepage"
    tabindex="-1">
    <span class="o-header__visually-hidden">Financial Times</span>
  </a>
)

const LoggedInState = () => (
  <span className="o-header__top-link--myft__container">
    <a
      className="o-header__top-link o-header__top-link--myft"
      href="/myft"
      data-trackable="my-ft"
      data-tour-stage="myFt"
      aria-label="My F T"
      tabindex="-1">
      <span className="o-header__visually-hidden">myFT</span>
    </a>
  </span>
)

const AnonymousUserState = (props) => {
  const navItems = props.data['navbar-right-anon'].items
  return (
    <div class="o-header__nav">
      <ul class="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
        {navItems.map((navItem, index) => {
          const includeExpanded = navItem.label === 'Subscribe' ? 'o-header__nav-item--expanded' : null
          const includeLinkType = navItem.label === 'Subscribe' ? 'button' : 'link'
          return (
            <li className={`o-header__nav-item ${includeExpanded}`} key={`link-${index}`}>
              <a
                className={`o-header__nav-${includeLinkType}`}
                href={navItem.url}
                id={`o-header-link-${index}`}
                data-trackable={navItem.label}
                tabindex="-1">
                {navItem.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const TopWrapperSticky = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-sticky">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

const TopColumnLeftSticky = (props) => {
  return (
    <div className="o-header__top-column o-header__top-column--left">
      <DrawerIconSticky />
      <SearchIconSticky {...props} />
    </div>
  )
}
const TopColumnCenterSticky = (props) => {
  return (
    <div className="o-header__top-column o-header__top-column--center">
      {/* On larger viewports show navigation
      On smaller viewports show FT logo  */}
      <Navigation {...props} />
      <Logo />
    </div>
  )
}

const TopColumnRightSticky = (props) => {
  const ChooseNavRight = props.options.userIsAnonymous ? AnonymousUserState(props) : LoggedInState
  return <div className="o-header__top-column o-header__top-column--right">{ChooseNavRight}</div>
}

export { StickyHeader, TopWrapperSticky, TopColumnLeftSticky, TopColumnCenterSticky, TopColumnRightSticky }
