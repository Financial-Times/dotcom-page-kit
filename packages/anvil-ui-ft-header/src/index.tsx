import React from 'react'
import {
  HeaderHtml,
  FooterTopWrapper,
  TopColumnLeft,
  TopColumnCenter,
  TopColumnRight,
  NavListLeft,
  NavListRight,
  NavHtml
} from './components/partials'

export function Header(props) {
  const navbarUk = props['navbar-uk'].items
  const navbarRight = props['navbar-right'].items
  const navbarRightAnon = props['navbar-right-anon'].items
  const navbarOption = props.userNav ? navbarRight : navbarRightAnon
  return (
    <HeaderHtml>
      <FooterTopWrapper>
        <TopColumnLeft />
        <TopColumnCenter />
        <TopColumnRight />
      </FooterTopWrapper>
      <NavHtml>
        <NavListLeft navbarUk={navbarUk} />
        <NavListRight navbarOption={navbarOption} />
      </NavHtml>
    </HeaderHtml>
  )
}

export function LogoOnly() {
  return (
    <HeaderHtml>
      <FooterTopWrapper>
        <TopColumnCenter />
      </FooterTopWrapper>
    </HeaderHtml>
  )
}
