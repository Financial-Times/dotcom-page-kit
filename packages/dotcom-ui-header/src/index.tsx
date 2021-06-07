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
  showSubNavigation: true,
  showUserNavigation: true,
  userIsAnonymous: true,
  userIsLoggedIn: false,
  showStickyHeader: true,
  showMegaNav: true
}

function MainHeader(props: THeaderProps) {
  const includeUserActionsNav = props.showUserNavigation && !props.userIsLoggedIn
  const includeSubNavigation = props.showSubNavigation && (props.data.breadcrumb || props.data.subsections)

  return (
    <HeaderWrapper {...props}>
      {includeUserActionsNav ? <UserActionsNav {...props} /> : null}
      <TopWrapper>
        <TopColumnLeft />
        {props.showLogoLink ? <TopColumnCenter /> : <TopColumnCenterNoLink />}
        <TopColumnRight />
      </TopWrapper>
      <Search instance="primary" />
      <MobileNav {...props} />
      <NavDesktop>
        <NavListLeft {...props} />
        {props.showUserNavigation ? <NavListRight {...props} /> : null}
      </NavDesktop>
      {includeSubNavigation ? <SubNavigation {...props} /> : null}
    </HeaderWrapper>
  )
}

MainHeader.defaultProps = { ...defaultProps, showLogoLink: true }

function StickyHeader(props: THeaderProps) {
  return props.showStickyHeader ? (
    <StickyHeaderWrapper {...props}>
      <TopWrapperSticky>
        <TopColumnLeftSticky />
        <TopColumnCenterSticky {...props} />
        <TopColumnRightSticky {...props} />
      </TopWrapperSticky>
      <Search instance="sticky" />
    </StickyHeaderWrapper>
  ) : null
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

function LogoOnly(props: Pick<THeaderProps, 'variant' | 'showLogoLink'>) {
  return (
    <HeaderWrapper {...props}>
      <TopWrapper>{props.showLogoLink ? <TopColumnCenter /> : <TopColumnCenterNoLink />}</TopWrapper>
    </HeaderWrapper>
  )
}

LogoOnly.defaultProps = defaultProps

function Drawer(props: THeaderProps) {
  return <IncludeDrawer {...props} />
}

Drawer.defaultProps = defaultProps

function NoOutboundLinksHeader(props: THeaderProps) {
  const includeUserActionsNav = props.showUserNavigation && !props.userIsLoggedIn
  const includeSubNavigation = props.showSubNavigation && (props.data.breadcrumb || props.data.subsections)

  return (
    <HeaderWrapper {...props}>
      {includeUserActionsNav ? <UserActionsNav {...props} /> : null}
      <TopWrapper>{props.showLogoLink ? <TopColumnCenter /> : <TopColumnCenterNoLink />}</TopWrapper>
      <NavDesktop>{props.showUserNavigation ? <NavListRight {...props} /> : null}</NavDesktop>
      {includeSubNavigation ? <SubNavigation {...props} /> : null}
    </HeaderWrapper>
  )
}

NoOutboundLinksHeader.defaultProps = defaultProps

export { Header, MainHeader, StickyHeader, LogoOnly, NoOutboundLinksHeader, Drawer }
export type { THeaderProps }
