import React from 'react'
import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import storyData from './story-data/storyData'
import * as header from '../browser.js'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'
import '../styles.scss'
import './demos.scss'

// falsey values are empty string because string coercion in storybook
const toggleUserStateOptions = () => boolean('Enable user nav actions', true)
// TODO: can we remove this?
const toggleMyFTSignOutOptions = () => boolean('Show myFT sign out link', false)
const toggleVariantOptions = () => radios('Choose variant', { simple: 'simple', normal: 'normal' }, 'simple')
const toggleAnonymous = () => boolean('User is anonymous', true)

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('Default header', () => {
    storyData.options.userNav = toggleUserStateOptions()
    storyData.options.userIsAnonymous = toggleAnonymous()
    storyData.options.showSignOut = toggleMyFTSignOutOptions()
    return <HeaderDefault {...storyData} />
  })
  .add('With drawer component', () => {
    return (
      <OnReady callback={() => header.init()}>
        <HeaderDefault {...storyData} />
        <Drawer {...storyData} />
      </OnReady>
    )
  })
  .add('Sticky header', () => {
    storyData.options.userIsAnonymous = toggleAnonymous()
    return (
      <OnReady callback={() => header.init()}>
        <HeaderSticky {...storyData} />
        <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
      </OnReady>
    )
  })
  .add('Logo only', () => {
    const optionalProps = { options: { variant: toggleVariantOptions() } }
    return <LogoOnly {...optionalProps} />
  })
