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
import { Props } from './interfaces'

export function HeaderDefault(props: Props) {
  const navItems = props.data.navbar.items
  const includeUserActionsNav =
    props.options.userNav && props.options.userIsAnonymous ? UserActionsNav(props) : null
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
    </Header>
  )
}

export function Drawer(props: Props) {
  return <IncludeDrawer {...props} />
}

export function HeaderSticky(props) {
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

export function HeaderStickyDemo(props) {
  return (
    <React.Fragment>
      <HeaderSticky {...props} />
      <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
    </React.Fragment>
  )
}

export function HeaderWithCrumbtrail(props: Props) {
  const navItems = props.data.navbar.items
  const incudeCrumbtrail = props.data.breadcrumb && props.data.subsections ? IncludeCrumbtrail(props) : null
  return (
    <Header {...props}>
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

export function LogoOnly(props?) {
  return (
    <Header {...props}>
      <TopWrapper>
        <TopColumnCenter />
      </TopWrapper>
    </Header>
  )
}
