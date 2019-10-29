import React from 'react'
import BrandFtMastheadSvg from '../svg-components/BrandFtMasthead'

const HeaderWrapper = (props) => (
  <header
    id="site-navigation"
    className={`o-header o-header--${props.variant || 'simple'}`}
    data-o-component="o-header"
    data-o-header--no-js={true}
    tabIndex={-1}>
    {props.children}
  </header>
)

const DrawerIcon = () => (
  <a
    href="#o-header-drawer"
    className="o-header__top-link o-header__top-link--menu"
    aria-controls="o-header-drawer"
    title="Open drawer menu"
    data-trackable="drawer-toggle">
    <span className="o-header__top-link-label">Open drawer menu</span>
  </a>
)

const SearchIcon = () => (
  <a
    href={`#o-header-search-primary`}
    className="o-header__top-link o-header__top-link--search"
    aria-controls={`o-header-search-primary`}
    title="Open search bar"
    data-trackable="search-toggle">
    <span className="o-header__top-link-label">Open search bar</span>
  </a>
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
      title="Go to Financial Times homepage">
      <BrandFtMastheadSvg />
      <span className="o-header__visually-hidden">Financial Times</span>
    </a>
  </div>
)

const TopColumnCenterNoLink = () => (
  <div className="o-header__top-column o-header__top-column--center">
    <div className="o-header__top-logo">
      <span className="o-header__visually-hidden">Financial Times</span>
    </div>
  </div>
)

const TopColumnRight = () => (
  <div className="o-header__top-column o-header__top-column--right">
    <MyFt />
  </div>
)

export { HeaderWrapper, TopWrapper, TopColumnLeft, TopColumnCenter, TopColumnCenterNoLink, TopColumnRight }
