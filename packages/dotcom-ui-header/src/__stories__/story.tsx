import React from 'react'
import Header from '@financial-times/o-header'
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
  Header.init()
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
  userIsSubscribed: false,
  showLogoLink: false,
  showAskButton: false
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
  showLogoLink: false,
  showAskButton: false
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
  variant: 'large-logo',
  showAskButton: false
}

export const _StickyHeader = (args) => (
  <OnReady callback={onReadyCallback}>
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
  userIsSubscribed: false,
  showStickyHeader: false,
  showAskButton: false
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
