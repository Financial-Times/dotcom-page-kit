import React from 'react'
import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import storyData from './story-data/storyData'
import * as header from '../browser.js'
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
    // header needs to be initialized after the component has rendered
    // to pull in JavaScript from o-header
    setImmediate(header.init)
    return [<HeaderDefault {...storyData} />, <Drawer {...storyData} />]
  })
  .add('Sticky header', () => {
    storyData.options.userIsAnonymous = toggleAnonymous()
    // header needs to be initialized after the component has rendered
    // to pull in JavaScript from o-header
    setImmediate(header.init)
    return [
      <HeaderSticky {...storyData} />,
      <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
    ]
  })
  .add('Logo only', () => {
    let optionalProps = { options: { variant: toggleVariantOptions() } }
    return <LogoOnly {...optionalProps} />
  })
