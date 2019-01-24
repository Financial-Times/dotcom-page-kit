import React from 'react'
import {
  HeaderSimple,
  TopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnRight
} from './components/top/partials'
import { NavListLeft, NavListRight, Nav } from './components/navigation/partials'
import { IncludeCrumbtrail } from './components/crumbtrail/partials'

export function Header(props) {
  // TODO Figure out how we should be handling UK v international
  const navbarOptionsLeft = props['navbar-uk'].items
  // TODO Figure out how we should be handling anon v user
  const navbarRight = props['navbar-right'].items
  const navbarRightAnon = props['navbar-right-anon'].items
  const navbarOptionsRight = props.userNav ? navbarRight : navbarRightAnon
  return (
    <HeaderSimple>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter />
        <TopColumnRight />
      </TopWrapper>
      <Nav>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <NavListRight navbarOptionsRight={navbarOptionsRight} />
      </Nav>
    </HeaderSimple>
  )
}

export function LogoOnly() {
  return (
    <HeaderSimple>
      <TopWrapper>
        <TopColumnCenter />
      </TopWrapper>
    </HeaderSimple>
  )
}

export function HeaderWithCrumbtrail(props) {
  const navbarOptionsLeft = props['navbar-uk'].items
  const navbarRight = props['navbar-right'].items
  const navbarRightAnon = props['navbar-right-anon'].items
  const navbarOptionsRight = props.userNav ? navbarRight : navbarRightAnon
  const incudeCrumbtrail = props.breadcrumb && props.subsections ? IncludeCrumbtrail({ props }) : null
  return (
    <HeaderSimple>
      <TopWrapper>
        <TopColumnLeft />
        <TopColumnCenter />
        <TopColumnRight />
      </TopWrapper>
      <Nav>
        <NavListLeft navbarOptionsLeft={navbarOptionsLeft} />
        <NavListRight navbarOptionsRight={navbarOptionsRight} />
      </Nav>
      {incudeCrumbtrail}
    </HeaderSimple>
  )
}
