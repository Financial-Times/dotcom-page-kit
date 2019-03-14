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
  userNav: false,
  hideOutboundLinks: false,
  userIsAnonymous: true,
  userIsLoggedIn: false,
  showSubNav: true,
  showSignOut: false
}

export function HeaderDefault(props: THeaderProps) {
  const navItems = props.data.navbar.items
  const includeUserActionsNav = props.userNav && props.userIsAnonymous ? UserActionsNav(props) : null
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

export function Drawer(props: THeaderProps) {
  return <IncludeDrawer {...props} />
}

Drawer.defaultProps = defaultProps

export function HeaderSticky(props: THeaderProps) {
  return (
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

export function LogoOnly(props?) {
  return (
    <Header {...props}>
      <TopWrapper>
        <TopColumnCenter />
      </TopWrapper>
    </Header>
  )
}

LogoOnly.defaultProps = defaultProps
