import React from 'react'

const HeaderHtml = (props) => (
  <header
    id="site-navigation"
    className="o-header"
    data-o-component="o-header"
    data-o-header--no-js={true}
    tabIndex={-1}>
    {props.children}
  </header>
)

const Drawer = () => (
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

const Search = () => (
  <a
    href="#o-header-search-primary"
    className="o-header__top-link o-header__top-link--search"
    aria-controls="o-header-search-primary"
    title="Search"
    aria-label="Search"
    data-trackable="search-toggle">
    <span className="o-header__top-link-label">Search</span>
  </a>
)

const FooterTopWrapper = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-top">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

const TopColumnLeft = () => {
  return (
    <div className="o-header__top-column o-header__top-column--left">
      <Drawer />
      <Search />
    </div>
  )
}

const TopColumnCenter = () => (
  <div className="o-header__top-column o-header__top-column--center">
    <div className="o-header__top-logo">
      <span className="o-header__visually-hidden">Financial Times</span>
    </div>
  </div>
)

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

const NavListLeft = ({ navbarUk }) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
      {navbarUk.map((navItem, index) => {
        const ariaLabel = navItem.selected ? { 'aria-label': 'Current page', 'aria-current': true } : null
        return (
          <li className="o-header__nav-item">
            <a
              className="o-header__nav-link o-header__nav-link--primary"
              href={navItem.href}
              id={`o-header-link-${index}`}
              {...ariaLabel}
              data-trackable={navItem.label}>
              {navItem.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const NavListRight = ({ navbarOption }) => {
  return (
    <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
      {navbarOption.map((navItem) => {
        return (
          <li className="o-header__nav-item">
            <a className="o-header__nav-link" href={navItem.href} data-trackable={navItem.label}>
              {navItem.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const NavHtml = (props) => {
  return (
    <nav
      id="o-header-nav-desktop"
      className="o-header__row o-header__nav o-header__nav--desktop"
      role="navigation"
      aria-label="Primary navigation"
      data-trackable="header-nav:desktop">
      <div className="o-header__container">{props.children}</div>
    </nav>
  )
}

export {
  HeaderHtml,
  FooterTopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnRight,
  NavListLeft,
  NavListRight,
  NavHtml
}
