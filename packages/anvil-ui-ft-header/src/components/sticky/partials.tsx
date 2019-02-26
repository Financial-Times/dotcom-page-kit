/* WARN: This file looks similar to '../top/partials */
/* This is the sticky header variant */

import React from 'react'

const StickyHeader = (props) => {
  return (
    <header
      className={`o-header o-header--${props.options.variant} o-header--sticky o--if-js`}
      data-o-component="o-header"
      data-o-header--no-js="true"
      data-o-header--sticky
      aria-hidden="true">
      {props.children}
    </header>
  )
}

const DrawerIconSticky = () => (
  <a
    href="#"
    className="o-header__top-link o-header__top-link--menu"
    aria-controls="o-header-drawer"
    data-trackable="drawer-toggle"
    tabindex="-1">
    <span className="o-header__top-link-label">Menu</span>
  </a>
)

const SearchIconSticky = ({ context }) => (
  <a
    href="#"
    className="o-header__top-link o-header__top-link--search"
    aria-controls={`o-header-search-${context}`}
    data-trackable="search-toggle"
    tabindex="-1">
    <span className="o-header__top-link-label">Search</span>
  </a>
)

const Navigation = (props) => {
  const navItems = props.data.navbar.items
  return (
    <div className="o-header__top-takeover">
      <div className="o-header__nav">
        <ul className="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
          {navItems.map((navItem, index) => {
            return (
              <li className="o-header__nav-item" key={`link-${index}`}>
                <a
                  className="o-header__nav-link o-header__nav-link--primary"
                  href={navItem.url}
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
    className="o-header__top-logo o-header__hide--L"
    data-trackable="logo"
    href="/"
    title="Go to Financial Times homepage"
    tabindex="-1">
    <span className="o-header__visually-hidden">Financial Times</span>
  </a>
)

const LoggedInState = () => (
  <a
    className="o-header__top-link o-header__top-link--myft"
    href="/myft"
    data-trackable="my-ft"
    tabindex="-1">
    <span className="o-header__visually-hidden">myFT</span>
  </a>
)

const AnonymousUserState = (props) => {
  const navItems = props.data['navbar-right-anon'].items
  return (
    <div className="o-header__nav">
      <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
        {navItems.map((navItem, index) => {
          const linkType = navItem.label === 'Subscribe' ? 'button' : 'link'
          return (
            <li className={`o-header__nav-item`} key={`link-${index}`}>
              <a
                className={`o-header__nav-${linkType}`}
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
  const ChooseNavRight = props.options.userIsAnonymous ? AnonymousUserState(props) : LoggedInState()
  return <div className="o-header__top-column o-header__top-column--right">{ChooseNavRight}</div>
}

export { StickyHeader, TopWrapperSticky, TopColumnLeftSticky, TopColumnCenterSticky, TopColumnRightSticky }
