import React from 'react'

const Header = (props) => {
  // const headerCompact = props && props.options.variant === 'compact' ? 'o-header--simple' : null
  return (
    <header
      id="site-navigation"
      className={`o-header o-header--${props.options.variant}`}
      data-o-component="o-header"
      data-o-header--no-js={true}
      tabIndex={-1}>
      {props.children}
    </header>
  )
}

const DrawerIcon = () => (
  <a
    href="#o-header-drawer"
    className="o-header__top-link o-header__top-link--menu"
    aria-controls="o-header-drawer"
    title="Open drawer menu"
    aria-label="Open drawer menu"
    data-trackable="drawer-toggle">
    <span className="o-header__top-link-label">Menu</span>
  </a>
)

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

const SearchIcon = ({ context }) => (
  <a
    href={`o-header-search-${context}`}
    className="o-header__top-link o-header__top-link--search"
    aria-controls={`o-header-search-${context}`}
    title="Search"
    aria-label="Search"
    data-trackable="search-toggle">
    <span className="o-header__top-link-label">Search</span>
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

const TopWrapper = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-top">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

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

const TopColumnLeft = (props) => {
  return (
    <div className="o-header__top-column o-header__top-column--left">
      <DrawerIcon />
      <SearchIcon {...props} />
    </div>
  )
}

const FTLogo = () => (
  <a className="o-header__top-logo" data-trackable="logo" href="/" title="Go to Financial Times homepage">
    <span className="o-header__visually-hidden">Financial Times</span>
  </a>
)

const FTLogoNoOutbound = () => (
  <div className="o-header__top-logo">
    <span className="o-header__visually-hidden">Financial Times</span>
  </div>
)

const TopColumnCenter = (props = null) => {
  const chooseFTLogo = props.hideOutboundLinks ? FTLogoNoOutbound() : FTLogo()
  return <div className="o-header__top-column o-header__top-column--center">{chooseFTLogo}</div>
}

const TopColumnCenterSticky = (props) => {
  const navItems = props.data.navbar.items
  return (
    <div className="o-header__top-column o-header__top-column--center">
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

      <a
        class="o-header__top-logo o-header__hide--L"
        data-trackable="logo"
        href="/"
        title="Go to Financial Times homepage"
        tabindex="-1">
        <span class="o-header__visually-hidden">Financial Times</span>
      </a>
    </div>
  )
}

const MyFt = () => (
  <a
    className="o-header__top-link o-header__top-link--myft"
    href="/myft"
    data-trackable="my-ft"
    data-tour-stage="myFt"
    aria-label="My F T">
    <span className="o-header__visually-hidden">myFT</span>
  </a>
)

const TopColumnRight = () => {
  return (
    <div className="o-header__top-column o-header__top-column--right">
      <span className="o-header__top-link--myft__container">
        <MyFt />
      </span>
    </div>
  )
}

const MyFtSticky = () => (
  <a
    className="o-header__top-link o-header__top-link--myft"
    href="/myft"
    data-trackable="my-ft"
    data-tour-stage="myFt"
    aria-label="My F T"
    tabindex="-1">
    <span className="o-header__visually-hidden">myFT</span>
  </a>
)

const LoggedIn = () => (
  <span className="o-header__top-link--myft__container">
    <MyFtSticky />
  </span>
)

const Anonymous = (props) => {
  const navItems = props.data['navbar-right-anon'].items
  return (
    <div class="o-header__nav">
      <ul class="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
        {navItems.map((navItem, index) => {
          const includeExpanded =
            navItem.label === 'Subscribe'
              ? 'o-header__nav-item--expanded'
              : null
              ? { 'aria-label': 'Current page', 'aria-current': true }
              : null
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

const TopColumnRightSticky = (props) => {
  const ChooseNavRight = props.options.userIsAnonymous ? Anonymous(props) : LoggedIn
  return <div className="o-header__top-column o-header__top-column--right">{ChooseNavRight}</div>
}

export {
  Header,
  TopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnRight,
  TopWrapperSticky,
  TopColumnCenterSticky,
  TopColumnLeftSticky,
  TopColumnRightSticky
}
