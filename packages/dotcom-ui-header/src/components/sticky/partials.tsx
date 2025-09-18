/* WARN: This file looks similar to ../top/partials */
/* This is the sticky header variant */

import React from 'react'
import { TopColumnRight } from '../top/partials'
import { THeaderProps } from '../../interfaces'
import { AskFtButton } from '../ask-ft/askFtButton'

const StickyHeaderWrapper = (props: THeaderProps & { children: React.ReactNode }) => (
  <header
    className={`o-header o-header--simple o-header--sticky o--if-js`}
    data-o-component="o-header"
    data-o-header--sticky
    aria-hidden="true"
  >
    {props.children}
  </header>
)

const DrawerIconSticky = () => (
  <a
    href="#"
    className="o-header__top-icon-link o-header__top-icon-link--menu"
    aria-controls="o-header-drawer"
    data-trackable="drawer-toggle"
    tabIndex={-1}
  >
    <span className="o-header__top-link-label">Menu</span>
  </a>
)

const SearchIconSticky = () => (
  <a
    href="#"
    className="o-header__top-icon-link o-header__top-icon-link--search"
    aria-controls="o-header-search-sticky"
    data-trackable="search-toggle"
    tabIndex={-1}
  >
    <span className="o-header__top-link-label">Search</span>
  </a>
)

const Navigation = (props: THeaderProps) => (
  <div className="o-header__top-takeover">
    <div className="o-header__nav">
      <ul className="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
        {props.data.navbar.items.map((item, index) => (
          <li className="o-header__nav-item" key={`link-${index}`}>
            <a
              className="o-header__nav-link o-header__nav-link--primary"
              href={item.url ?? undefined}
              data-trackable={item.label}
              tabIndex={-1}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Logo = () => (
  <a
    className="o-header__top-logo o-header__hide--L"
    data-trackable="logo"
    href="/"
    title="Go to Financial Times homepage"
    tabIndex={-1}
  >
    <span className="o-header__visually-hidden">Financial Times</span>
  </a>
)

const TopWrapperSticky = (props) => (
  <div className="o-header__row o-header__top" data-trackable="header-sticky">
    <div className="o-header__container">
      <div className="o-header__top-wrapper">{props.children}</div>
    </div>
  </div>
)

const TopColumnLeftSticky = (props: Pick<THeaderProps, 'showAskButton'>) => {
  return (
    <div className="o-header__top-column o-header__top-column--left">
      <DrawerIconSticky />
      <SearchIconSticky />
      {props.showAskButton && (
        <AskFtButton variant="sticky" dataTrackable="ask-ft-button-sticky" id="ask-ft-button-sticky" />
      )}
    </div>
  )
}
const TopColumnCenterSticky = (props: THeaderProps) => {
  return (
    <div className="o-header__top-column o-header__top-column--center">
      <Navigation {...props} />
      <Logo />
    </div>
  )
}

const TopColumnRightSticky = (props: THeaderProps) => {
  return <TopColumnRight {...props} />
}

export {
  StickyHeaderWrapper,
  TopWrapperSticky,
  TopColumnLeftSticky,
  TopColumnCenterSticky,
  TopColumnRightSticky
}
