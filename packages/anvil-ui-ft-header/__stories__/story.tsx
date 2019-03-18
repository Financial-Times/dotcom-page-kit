import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import * as header from '../browser.js'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'
import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '../src'
import storyData from './story-data'
import '../styles.scss'
import './demos.scss'

// falsey values are empty string because string coercion in storybook
const toggleUserStateOptions = () => boolean('Enable user nav actions', true)
const toggleVariantOptions = () => radios('Choose variant', { simple: 'simple', normal: 'normal' }, 'simple')
const toggleAnonymous = () => boolean('User is anonymous', true)

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('Default header', () => {
    const knobs = {
      showUserNav: toggleUserStateOptions(),
      userIsAnonymous: toggleAnonymous(),
    }

    return (
      <OnReady callback={() => header.init()}>
        <HeaderDefault {...storyData} {...knobs} />
      </OnReady>
    )
  })
  .add('With drawer component', () => {
    const knobs = {
      showUserNav: toggleUserStateOptions(),
      userIsAnonymous: toggleAnonymous()
    }

    return (
      <OnReady callback={() => header.init()}>
        <HeaderDefault {...storyData} {...knobs} />
        <Drawer {...storyData} {...knobs} />
      </OnReady>
    )
  })
  .add('Sticky header', () => {
    const knobs = {
      showUserNav: toggleUserStateOptions(),
      userIsAnonymous: toggleAnonymous()
    }

    return (
      <OnReady callback={() => header.init()}>
        <HeaderSticky {...storyData} {...knobs} />
        <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
      </OnReady>
    )
  })
  .add('Logo only', () => {
    const knobs = { variant: toggleVariantOptions() }
    return <LogoOnly {...knobs} />
  })
