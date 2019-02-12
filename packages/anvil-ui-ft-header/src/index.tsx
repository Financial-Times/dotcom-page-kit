import React from 'react'
import { Header, TopWrapper, TopColumnLeft, TopColumnCenter, TopColumnRight } from './components/top/partials'
import {
  NavListLeft,
  ChooseNavListRight,
  NavDesktop,
  NavMobile,
  UserActionsNav
} from './components/navigation/partials'
import { IncludeCrumbtrail } from './components/crumbtrail/partials'
import { Search } from './components/search/partials'
import { Props } from './interfaces'

export function HeaderDefault(props: Props) {
  const navItems = props.data.navbar.items
  const includeUserActionsNav =
    props.options.userNav && props.options.userIsAnonymous ? UserActionsNav(props) : null
  return (
    <Header data={props}>
      {includeUserActionsNav}
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter {...props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context="mobile" />
      <NavMobile items={props.data['navbar-simple'].items} />
      <NavDesktop>
        <NavListLeft navItems={navItems} />
        <ChooseNavListRight {...props} />
      </NavDesktop>
    </Header>
  )
}

export function LogoOnly(props?) {
  return (
    <Header data={props}>
      <TopWrapper>
        <TopColumnCenter />
      </TopWrapper>
    </Header>
  )
}

export function HeaderWithCrumbtrail(props: Props) {
  const navItems = props.data.navbar.items
  const incudeCrumbtrail =
    props.data.breadcrumb && props.data.subsections ? IncludeCrumbtrail({ props }) : null
  return (
    <Header data={props}>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter {...props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context="primary" />
      <NavMobile items={props.data['navbar-simple'].items} />
      <NavDesktop>
        <NavListLeft navItems={navItems} />
        <ChooseNavListRight {...props} />
      </NavDesktop>
      {incudeCrumbtrail}
    </Header>
  )
}
