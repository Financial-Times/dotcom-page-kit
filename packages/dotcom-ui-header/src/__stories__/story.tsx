import React from 'react'
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

const onReadyCallback = () => {
  // Passing a cors-anywhere hostname to n-topic-search
  // An 'origin' request header will be set on the subsequent fetch request to next-search-api
  // This satisfies the api's cors rules allowing a response to be sent and rendered on localhost
  header.init({ hostName: 'cors-anywhere.herokuapp.com/www.ft.com' })
}

export default {
  title: 'FT / Header',
  args: {
    currentPath: '/'
  },
  argTypes: {
    currentPath: {
      control: {
        type: 'radio',
        options: { show: '/', hide: '/404' }
      }
    }
  }
}

export const DefaultHeaderWithDrawer = (args) => (
  <OnReady callback={onReadyCallback}>
    <HeaderSimple {...storyData} {...args} />
    <Drawer {...storyData} {...args} />
  </OnReady>
)

DefaultHeaderWithDrawer.story = {
  name: 'Default header with drawer'
}
DefaultHeaderWithDrawer.args = {
  showSubNavigation: true,
  showMegaNav: true,
  showUserNavigation: true,
  userIsLoggedIn: false,
  showLogoLink: false
}

export const DefaultHeaderWithRightAlignedSubnav = (args) => (
  <OnReady callback={onReadyCallback}>
    <HeaderSimple {...profileStoryData} {...args} />
    <Drawer {...profileStoryData} {...args} />
  </OnReady>
)

DefaultHeaderWithRightAlignedSubnav.story = {
  name: 'Default header with right aligned subnav'
}
DefaultHeaderWithRightAlignedSubnav.args = {
  showSubNavigation: true,
  showMegaNav: true,
  showUserNavigation: true,
  userIsLoggedIn: true,
  showLogoLink: false
}

export const LargeHeaderWithDrawer = (args) => (
  <OnReady callback={onReadyCallback}>
    <HeaderLarge {...storyData} {...args} />
    <Drawer {...storyData} {...args} />
  </OnReady>
)

LargeHeaderWithDrawer.story = {
  name: 'Large header with drawer'
}
LargeHeaderWithDrawer.story = {
  name: 'Default header with drawer'
}
LargeHeaderWithDrawer.args = {
  showSubNavigation: true,
  showMegaNav: true,
  showUserNavigation: true,
  userIsLoggedIn: false,
  variant: 'large-logo'
}

export const _StickyHeader = (args) => (
  <OnReady callback={() => header.init()}>
    <StickyHeader {...storyData} {...args} />
    <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
  </OnReady>
)

_StickyHeader.story = {
  name: 'Sticky header'
}
_StickyHeader.args = {
  showUserNavigation: true,
  userIsLoggedIn: false,
  showStickyHeader: false
}
_StickyHeader.argTypes = {
  currentPath: {
    table: {
      disable: true
    }
  }
}

export const _LogoOnly = (args) => {
  return <LogoOnly {...args} />
}

_LogoOnly.story = {
  name: 'Logo only'
}
_LogoOnly.args = {
  variant: 'simple',
  showLogoLink: false
}
_LogoOnly.argTypes = {
  variant: {
    control: {
      type: 'radio',
      options: { default: 'simple', large: 'large' }
    }
  },
  currentPath: {
    table: {
      disable: true
    }
  }
}

export const NoOutboundLinks = (args) => <NoOutboundLinksHeader {...storyData} {...args} />

NoOutboundLinks.story = {
  name: 'No Outbound links'
}
NoOutboundLinks.args = {
  showSubNavigation: true,
  showUserNavigation: true,
  userIsLoggedIn: false,
  showLogoLink: false
}
NoOutboundLinks.argTypes = {
  currentPath: {
    table: {
      disable: true
    }
  }
}
