import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import * as header from '../../browser.js'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'
import { Header, Drawer, StickyHeader, LogoOnly } from '../../src'
import storyData from './story-data'
import '../../styles.scss'
import './demos.scss'

const toggleUserStateOptions = () => boolean('Enable user nav actions', true)
const toggleVariantOptions = () => radios('Choose variant', { simple: 'simple', normal: 'normal' }, 'simple')
const toggleAnonymous = () => boolean('User is anonymous', true)
const toggleShowSubNav = () => boolean('Show the crumbtrail component', true)
const toggleDisableSticky = () => boolean('Disable sticky header', false)
const toggleMobileNav = () => radios('Show mobile nav', { show: '/', hide: '' }, '/')

const onReadyCallback = () => {
  // Passing a cors-anywhere hostname to n-topic-search
  // An 'origin' request header will be set on the subsequent fetch request to next-search-api
  // This satisfies the api's cors rules allowing a response to be sent and rendered on localhost
  header.init({ hostName: 'cors-anywhere.herokuapp.com/www.ft.com' })
}

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('Default header', () => {
    const knobs = {
      showSubNav: toggleShowSubNav(),
      showUserNav: toggleUserStateOptions(),
      userIsAnonymous: toggleAnonymous()
    }
    storyData.data = { ...storyData.data, currentPath: toggleMobileNav() }

    return (
      <OnReady callback={onReadyCallback}>
        <Header {...storyData} {...knobs} />
      </OnReady>
    )
  })
  .add('With drawer component', () => {
    const knobs = {
      showUserNav: toggleUserStateOptions(),
      userIsAnonymous: toggleAnonymous()
    }
    storyData.data = { ...storyData.data, currentPath: toggleMobileNav() }

    return (
      <OnReady callback={onReadyCallback}>
        <Header {...storyData} {...knobs} />
        <Drawer {...storyData} {...knobs} />
      </OnReady>
    )
  })
  .add('Sticky header', () => {
    const knobs = {
      showUserNav: toggleUserStateOptions(),
      userIsAnonymous: toggleAnonymous(),
      disableSticky: toggleDisableSticky()
    }

    return (
      <OnReady callback={() => header.init()}>
        <StickyHeader {...storyData} {...knobs} />
        <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
      </OnReady>
    )
  })
  .add('Logo only', () => {
    const knobs = { variant: toggleVariantOptions() }
    return <LogoOnly {...knobs} />
  })
