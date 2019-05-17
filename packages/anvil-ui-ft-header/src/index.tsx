import React from 'react'
import {
  HeaderWrapper,
  TopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnCenterNoLink,
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

import { THeaderProps, THeaderOptions } from './interfaces'

const defaultProps: Partial<THeaderOptions> = {
  showUserNav: true,
  showSubNavigation: true,
  showUserNavigation: true,
  userIsAnonymous: true,
  userIsLoggedIn: false,
  disableSticky: false
}

function MainHeader(props: THeaderProps) {
  const includeUserActionsNav = props.showUserNavigation && !props.userIsLoggedIn
  const includeSubNavigation = props.showSubNavigation && (props.data.breadcrumb || props.data.subsections)

  return (
    <HeaderWrapper {...props}>
      {includeUserActionsNav ? <UserActionsNav {...props} /> : null}
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter />
        <TopColumnRight />
      </TopWrapper>
      <Search context="primary" />
      <MobileNav {...props} />
      <NavDesktop>
        <NavListLeft {...props} />
        {props.showUserNavigation ? <NavListRight {...props} /> : null}
      </NavDesktop>
      {includeSubNavigation ? <SubNavigation {...props} /> : null}
    </HeaderWrapper>
  )
}

MainHeader.defaultProps = defaultProps

function StickyHeader(props: THeaderProps) {
  return props.disableSticky ? null : (
    <StickyHeaderWrapper {...props}>
      <TopWrapperSticky>
        <TopColumnLeftSticky />
        <TopColumnCenterSticky {...props} />
        <TopColumnRightSticky {...props} />
      </TopWrapperSticky>
      <Search context="sticky" />
    </StickyHeaderWrapper>
  )
}

StickyHeader.defaultProps = defaultProps

function Header(props: THeaderProps) {
  return (
    <React.Fragment>
      <MainHeader {...props} />
      <StickyHeader {...props} />
    </React.Fragment>
  )
}

Header.defaultProps = defaultProps

function LogoOnly() {
  return (
    <HeaderWrapper>
      <TopWrapper>
        <TopColumnCenterNoLink />
      </TopWrapper>
    </HeaderWrapper>
  )
}

LogoOnly.defaultProps = defaultProps

function Drawer(props: THeaderProps) {
  return <IncludeDrawer {...props} />
}

Drawer.defaultProps = defaultProps

export { THeaderProps, Header, MainHeader, StickyHeader, LogoOnly, Drawer }
