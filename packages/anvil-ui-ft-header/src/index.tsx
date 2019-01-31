import React from 'react'
import { Header, TopWrapper, TopColumnLeft, TopColumnCenter, TopColumnRight } from './components/top/partials'
import { NavListLeft, ChooseNavListRight, Nav, NavSimple } from './components/navigation/partials'
import { IncludeCrumbtrail } from './components/crumbtrail/partials'
import { Props } from './interfaces'

export function HeaderMain(props: Props) {
  const navbarOptionsLeft = props['navbar'].items
  return (
    <Header data={props}>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter props={props} />
        <TopColumnRight />
      </TopWrapper>
      <Nav>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <ChooseNavListRight props={props} />
      </Nav>
    </Header>
  )
}

export function HeaderSimpleNav(props) {
  const navbarSimple = props['navbar-simple'].items
  return (
    <Header data={props}>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter props={props} />
        <TopColumnRight />
      </TopWrapper>
      <NavSimple navbarSimple={navbarSimple} />
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
  const navbarOptionsLeft = props['navbar'].items
  const incudeCrumbtrail = props.breadcrumb && props.subsections ? IncludeCrumbtrail({ props }) : null
  return (
    <Header data={props}>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter props={props} />
        <TopColumnRight />
      </TopWrapper>
      <Nav>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <ChooseNavListRight props={props} />
      </Nav>
      {incudeCrumbtrail}
    </Header>
  )
}
