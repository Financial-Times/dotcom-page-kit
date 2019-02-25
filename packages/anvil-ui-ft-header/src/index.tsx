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
  TopWrapperSticky,
  TopColumnCenterSticky,
  TopColumnLeftSticky,
  TopColumnRightSticky
} from './components/sticky/partials'
import { IncludeCrumbtrail } from './components/crumbtrail/partials'
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

export function HeaderSticky(props) {
  return (
    <Header {...props}>
      <TopWrapperSticky>
        <TopColumnLeftSticky context="primary" />
        <TopColumnCenterSticky {...props} />
        <TopColumnRightSticky {...props} />
      </TopWrapperSticky>
    </Header>
  )
}

export function HeaderStickyDemo(props) {
  return (
    <React.Fragment>
      <Header {...props}>
        <TopWrapperSticky>
          <TopColumnLeftSticky context="primary" />
          <TopColumnCenterSticky {...props} />
          <TopColumnRightSticky {...props} />
        </TopWrapperSticky>
      </Header>
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
