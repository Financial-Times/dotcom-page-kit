import React from 'react'
import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './story-data/storyData'

import './components/drawer/drawer.scss'
import './demos.scss'

// falsey values are empty string because string coercion in storybook
const toggleUserStateOptions = () => boolean('Enable user nav actions', true)
// TODO: can we remove this?
const toggleMyFTSignOutOptions = () => boolean('Show myFT sign out link', false)
const toggleVariantOptions = () => radios('Choose variant', { simple: 'simple', normal: 'normal' }, 'simple')
const toggleAnonymous = () => boolean('User is anonymous', true)

const OrigamiDependecies = {
  'o-header': '^7.7.0',
  'o-fonts': '^3.2.0',
  'o-normalise': '^1.6.2'
}

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('Default header', () => {
    storyData.options.userNav = toggleUserStateOptions()
    storyData.options.userIsAnonymous = toggleAnonymous()
    storyData.options.showSignOut = toggleMyFTSignOutOptions()
    return (
      <OrigamiBuildService dependencies={OrigamiDependecies}>
        <HeaderDefault {...storyData} />
      </OrigamiBuildService>
    )
  })
  .add('With drawer component', () => {
    return (
      <OrigamiBuildService dependencies={OrigamiDependecies}>
        <HeaderDefault {...storyData} />
        <Drawer {...storyData} />
      </OrigamiBuildService>
    )
  })
  .add('Sticky header', () => {
    storyData.options.userIsAnonymous = toggleAnonymous()
    return (
      <OrigamiBuildService dependencies={OrigamiDependecies}>
        <HeaderSticky {...storyData} />
        <p className="demo-sticky-message demo-sticky-message--scroll">Scroll down</p>
      </OrigamiBuildService>
    )
  })
  .add('Logo only', () => {
    let optionalProps = { options: { variant: toggleVariantOptions() } }
    return (
      <OrigamiBuildService dependencies={OrigamiDependecies}>
        <LogoOnly {...optionalProps} />
      </OrigamiBuildService>
    )
  })
