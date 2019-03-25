import React from 'react'
import { Header, TopWrapper, TopColumnLeft, TopColumnCenter, TopColumnRight } from './components/top/partials'
import {
  NavListLeft,
  NavListRight,
  NavDesktop,
  NavMobile,
  UserActionsNav
} from './components/navigation/partials'
import {
  StickyHeader,
  TopWrapperSticky,
  TopColumnCenterSticky,
  TopColumnLeftSticky,
  TopColumnRightSticky
} from './components/sticky/partials'
import { IncludeCrumbtrail } from './components/crumbtrail/partials'
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

function HeaderDefault(props: THeaderProps) {
  const navItems = props.data.navbar.items
  const includeUserActionsNav = props.showUserNav && props.userIsAnonymous ? UserActionsNav(props) : null
  const incudeCrumbtrail = props.data.breadcrumb && props.data.subsections ? IncludeCrumbtrail(props) : null
  return (
    <Header {...props}>
      {includeUserActionsNav}
      <TopWrapper>
        <TopColumnLeft context="primary" />
        <TopColumnCenter {...props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context="primary" />
      <NavMobile data={props.data['navbar-simple'].items} />
      <NavDesktop>
        <NavListLeft navItems={navItems} />
        <NavListRight {...props} />
      </NavDesktop>
      {incudeCrumbtrail}
    </Header>
  )
}

HeaderDefault.defaultProps = defaultProps

function Drawer(props: THeaderProps) {
  return <IncludeDrawer {...props} />
}

Drawer.defaultProps = defaultProps

function HeaderSticky(props: THeaderProps) {
  return props.disableSticky ? null : (
    <StickyHeader {...props}>
      <TopWrapperSticky>
        <TopColumnLeftSticky context="sticky" />
        <TopColumnCenterSticky {...props} />
        <TopColumnRightSticky {...props} />
      </TopWrapperSticky>
      <Search context="sticky" />
    </StickyHeader>
  )
}

HeaderSticky.defaultProps = defaultProps

function LogoOnly(props?) {
  return (
    <Header {...props}>
      <TopWrapper>
        <TopColumnCenter />
      </TopWrapper>
    </Header>
  )
}

LogoOnly.defaultProps = defaultProps

export { THeaderProps, HeaderDefault, Drawer, HeaderSticky, LogoOnly }
