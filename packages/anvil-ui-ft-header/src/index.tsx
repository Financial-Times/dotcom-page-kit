import React from 'react'
import {
  HeaderWrapper,
  TopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnRight
} from './components/top/partials'
import {
  NavListLeft,
  NavListRight,
  NavDesktop,
  UserActionsNav,
  MobileNav
} from './components/navigation/partials'
import {
  StickyHeaderWrapper,
  TopWrapperSticky,
  TopColumnCenterSticky,
  TopColumnLeftSticky,
  TopColumnRightSticky
} from './components/sticky/partials'
import { SubNavigation } from './components/sub-navigation/partials'
import { IncludeDrawer } from './components/drawer/topLevelPartials'
import { Search } from './components/search/partials'

import { THeaderProps } from './interfaces'

const defaultProps: Partial<THeaderProps> = {
  showUserNav: true,
  showSubNav: true,
  hideOutboundLinks: false,
  userIsAnonymous: true,
  userIsLoggedIn: false,
  disableSticky: false
}

function Header(props: THeaderProps) {
  const navItems = props.data.navbar.items
  const includeUserActionsNav = props.showUserNav && props.userIsAnonymous ? UserActionsNav(props) : null
  const incudeSubNavigation = props.data.breadcrumb && props.data.subsections ? SubNavigation(props) : null
  return (
    <HeaderWrapper {...props}>
      {includeUserActionsNav}
      <TopWrapper>
        <TopColumnLeft context="primary" />
        <TopColumnCenter {...props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context="primary" />
      {MobileNav(props)}
      <NavDesktop>
        <NavListLeft navItems={navItems} />
        <NavListRight {...props} />
      </NavDesktop>
      {incudeSubNavigation}
    </HeaderWrapper>
  )
}

Header.defaultProps = defaultProps

function Drawer(props: THeaderProps) {
  return <IncludeDrawer {...props} />
}

Drawer.defaultProps = defaultProps

function StickyHeader(props: THeaderProps) {
  return props.disableSticky ? null : (
    <StickyHeaderWrapper {...props}>
      <TopWrapperSticky>
        <TopColumnLeftSticky context="sticky" />
        <TopColumnCenterSticky {...props} />
        <TopColumnRightSticky {...props} />
      </TopWrapperSticky>
      <Search context="sticky" />
    </StickyHeaderWrapper>
  )
}

StickyHeader.defaultProps = defaultProps

function LogoOnly(props?) {
  return (
    <HeaderWrapper {...props}>
      <TopWrapper>
        <TopColumnCenter />
      </TopWrapper>
    </HeaderWrapper>
  )
}

LogoOnly.defaultProps = defaultProps

export { THeaderProps, Header, Drawer, StickyHeader, LogoOnly }
