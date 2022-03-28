import React from 'react'
import { THeaderProps } from '../../interfaces'
import BrandFtMastheadSvg from '../svg-components/BrandFtMasthead'
import { NavListRightAnon, SubscribeButton } from '../navigation/partials'

const HeaderWrapper = (props) => (
  <header
    id="site-navigation"
    className={`o-header o-header--${props.variant || 'simple'}`}
    data-o-component="o-header"
    data-o-header--no-js={true}
    tabIndex={-1}
  >
    {props.children}
  </header>
)

const DrawerIcon = () => (
  <a
    href="#o-header-drawer"
    className="o-header__top-link o-header__top-link--menu"
    aria-controls="o-header-drawer"
    title="Open side navigation menu"
    data-trackable="drawer-toggle"
  >
    <span className="o-header__top-link-label">Open side navigation menu</span>
  </a>
)

const SearchIcon = () => (
  <a
    href={`#o-header-search-primary`}
    className="o-header__top-link o-header__top-link--search"
    aria-controls={`o-header-search-primary`}
    title="Open search bar"
    data-trackable="search-toggle"
  >
    <span className="o-header__top-link-label">Open search bar</span>
  </a>
)

const MyFt = () => (
  <a
    className="o-header__top-link o-header__top-link--myft"
    id="o-header-top-link-myft"
    href="/myft"
    data-trackable="my-ft"
    data-tour-stage="myFt"
    aria-label="My F T"
  >
    <span className="o-header__visually-hidden">myFT</span>
  </a>
)

const TopWrapper = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-top">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

const TopColumnLeft = () => (
  <div className="o-header__top-column o-header__top-column--left">
    <DrawerIcon />
    <SearchIcon />
  </div>
)

const TopColumnCenter = () => (
  <div className="o-header__top-column o-header__top-column--center">
    <a
      className="o-header__top-logo"
      style={{ backgroundImage: 'none' }}
      data-trackable="logo"
      href="/"
      title="Go to Financial Times homepage"
    >
      <BrandFtMastheadSvg title="Financial Times" />
    </a>
  </div>
)

const TopColumnCenterNoLink = () => (
  <div className="o-header__top-column o-header__top-column--center">
    <div className="o-header__top-logo" style={{ backgroundImage: 'none' }}>
      <BrandFtMastheadSvg title="Financial Times" />
    </div>
  </div>
)

const TopColumnRightLoggedIn = (props: THeaderProps) => {
  const subscribeAction = props.data['navbar-right-anon']?.items?.[1]
  return (
    <div className="o-header__top-column o-header__top-column--right">
      <ul className="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
        <li className="o-header__nav-item">
          {props.userIsSubscribed && subscribeAction && (
            <SubscribeButton item={subscribeAction} variant={props.variant} />
          )}
        </li>
        <li className="o-header__nav-item o-header__nav-item--hide-s">
          <MyFt />
        </li>
      </ul>
    </div>
  )
}

const TopColumnRightAnon = (props: THeaderProps) => {
  const userNavAnonItems = props.data['navbar-right-anon'].items
  return (
    <div className="o-header__top-column o-header__top-column--right">
      <NavListRightAnon items={userNavAnonItems} variant={props.variant} />
    </div>
  )
}

const TopColumnRight = (props: THeaderProps) => {
  if (props.userIsLoggedIn) {
    return <TopColumnRightLoggedIn {...props} />
  } else {
    return <TopColumnRightAnon {...props} />
  }
}

export { HeaderWrapper, TopWrapper, TopColumnLeft, TopColumnCenter, TopColumnCenterNoLink, TopColumnRight }
