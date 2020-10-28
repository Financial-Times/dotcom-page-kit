import React from 'react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import * as header from '../../browser.js'
import { OnReady } from '../../../../.storybook/components/OnReady'
import {
  Header as HeaderSimple,
  Header as HeaderLarge,
  Drawer,
  StickyHeader,
  LogoOnly,
  NoOutboundLinksHeader
} from '../../src'
import storyData from './story-data'
import profileStoryData from './story-data/profile'
import '../../styles.scss'
import './demos.scss'

const toggleUserStateOptions = () => boolean('Enable user nav actions', true)
const toggleVariantOptions = () => radios('Choose variant', { default: 'simple', large: 'large' }, 'simple')
const toggleShowLogoLink = () => boolean('Render with the logo having a link', false)
const toggleLoggedIn = () => boolean('User is logged in', false)
const toggleShowSubNav = () => boolean('Show the sub-navigation component', true)
const toggleShowStickyHeader = () => boolean('Show the sticky header', true)
const toggleShowMegaNav = () => boolean('Show the drop-down "mega nav"', true)
const toggleMobileNav = () => radios('Show mobile nav', { show: '/', hide: '/404' }, '/')

const onReadyCallback = () => {
  // Passing a cors-anywhere hostname to n-topic-search
  // An 'origin' request header will be set on the subsequent fetch request to next-search-api
  // This satisfies the api's cors rules allowing a response to be sent and rendered on localhost
  header.init({ hostName: 'cors-anywhere.herokuapp.com/www.ft.com' })
}

export default {
  title: 'FT / Header',
  decorators: [withKnobs]
}

export const DefaultHeaderWithDrawer = () => {
  const knobs = {
    showSubNavigation: toggleShowSubNav(),
    showMegaNav: toggleShowMegaNav(),
    showUserNavigation: toggleUserStateOptions(),
    userIsLoggedIn: toggleLoggedIn(),
    currentPath: toggleMobileNav(),
    showLogoLink: toggleShowLogoLink()
  }
  storyData.data = { ...storyData.data, currentPath: toggleMobileNav() }

  return (
    <OnReady callback={onReadyCallback}>
      <HeaderSimple {...storyData} {...knobs} />
      <Drawer {...storyData} {...knobs} />
    </OnReady>
  )
}

DefaultHeaderWithDrawer.story = {
  name: 'Default header with drawer'
}

export const DefaultHeaderWithRightAlignedSubnav = () => {
  const knobs = {
    showMegaNav: toggleShowMegaNav(),
    currentPath: toggleMobileNav(),
    showLogoLink: toggleShowLogoLink(),
    showUserNavigation: true,
    showSubNavigation: true,
    userIsLoggedIn: true
  }

  profileStoryData.data = { ...profileStoryData.data, currentPath: toggleMobileNav() }

  return (
    <OnReady callback={onReadyCallback}>
      <HeaderSimple {...profileStoryData} {...knobs} />
      <Drawer {...profileStoryData} {...knobs} />
    </OnReady>
  )
}

DefaultHeaderWithRightAlignedSubnav.story = {
  name: 'Default header with right aligned subnav'
}

export const LargeHeaderWithDrawer = () => {
  const knobs = {
    showSubNavigation: toggleShowSubNav(),
    showUserNavigation: toggleUserStateOptions(),
    showMegaNav: toggleShowMegaNav(),
    userIsLoggedIn: toggleLoggedIn(),
    currentPath: toggleMobileNav(),
    variant: 'large-logo'
  }
  storyData.data = { ...storyData.data, currentPath: toggleMobileNav() }

  return (
    <OnReady callback={onReadyCallback}>
      <HeaderLarge {...storyData} {...knobs} />
      <Drawer {...storyData} {...knobs} />
    </OnReady>
  )
}

LargeHeaderWithDrawer.story = {
  name: 'Large header with drawer'
}

export const _StickyHeader = () => {
  const knobs = {
    showUserNavigation: toggleUserStateOptions(),
    userIsLoggedIn: toggleLoggedIn(),
    showStickyHeader: toggleShowStickyHeader()
  }

  return (
    <OnReady callback={() => header.init()}>
      <StickyHeader {...storyData} {...knobs} />
      <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
    </OnReady>
  )
}

_StickyHeader.story = {
  name: 'Sticky header'
}

export const _LogoOnly = () => {
  const knobs = { variant: toggleVariantOptions(), showLogoLink: toggleShowLogoLink() }
  return <LogoOnly {...knobs} />
}

_LogoOnly.story = {
  name: 'Logo only'
}

export const NoOutboundLinks = () => {
  const knobs = {
    userIsLoggedIn: toggleLoggedIn(),
    showLogoLink: toggleShowLogoLink(),
    showUserNavigation: toggleUserStateOptions(),
    showSubNavigation: toggleShowSubNav()
  }

  return <NoOutboundLinksHeader {...storyData} {...knobs} />
}

NoOutboundLinks.story = {
  name: 'No Outbound links'
}
