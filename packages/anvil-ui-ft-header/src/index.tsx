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
  const navbarOptionsLeft = props.navbar.items
  const includeNavbar = props.userNav ? UserActionsNav({ props }) : null
  return (
    <Header data={props}>
      {includeNavbar}
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter props={props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context={'primary'} />
      <NavMobile navbarSimple={props['navbar-simple'].items} />
      <NavDesktop>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <ChooseNavListRight props={props} />
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
  const navbarOptionsLeft = props.navbar.items
  const incudeCrumbtrail = props.breadcrumb && props.subsections ? IncludeCrumbtrail({ props }) : null
  return (
    <Header data={props}>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter props={props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context={'primary'} />
      <NavMobile navbarSimple={props['navbar-simple'].items} />
      <NavDesktop>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <ChooseNavListRight props={props} />
      </NavDesktop>
      {incudeCrumbtrail}
    </Header>
  )
}

export function HeaderWithUserActionsNav(props: Props) {
  const navbarOptionsLeft = props.navbar.items
  const includeNavbar = props.userNav ? UserActionsNav({ props }) : null
  return (
    <Header data={props}>
      {includeNavbar}
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter props={props} />
        <TopColumnRight />
      </TopWrapper>
      <Search context={'primary'} />
      <NavMobile navbarSimple={props['navbar-simple'].items} />
      <NavDesktop>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <ChooseNavListRight props={props} />
      </NavDesktop>
    </Header>
  )
}
