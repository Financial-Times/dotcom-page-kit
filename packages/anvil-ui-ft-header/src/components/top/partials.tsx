import React from 'react'
import { THeaderProps } from '../../interfaces'

const HeaderWrapper = (props: THeaderProps) => {
  return (
    <header
      id="site-navigation"
      className={`o-header o-header--${props.variant || 'simple'}`}
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

const TopColumnLeft = (props) => {
  return (
    <div className="o-header__top-column o-header__top-column--left">
      <DrawerIcon />
      <SearchIcon {...props} />
    </div>
  )
}

const TopColumnCenter = (props = null) => {
  const chooseFTLogo = props.hideOutboundLinks ? FTLogoNoOutbound() : FTLogo()
  return <div className="o-header__top-column o-header__top-column--center">{chooseFTLogo}</div>
}

const TopColumnRight = () => {
  return (
    <div className="o-header__top-column o-header__top-column--right">
      <MyFt />
    </div>
  )
}

export { HeaderWrapper, TopWrapper, TopColumnLeft, TopColumnCenter, TopColumnRight }
