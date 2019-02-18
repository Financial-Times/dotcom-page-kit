import React from 'react'
import { HeaderDefault, HeaderWithCrumbtrail, LogoOnly } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './story-data/storyData'

// falsey values are empty string because string coercion in storybook
const toggleUserStateOptions = () => boolean('Enable user nav actions', true)
const toggleSignOutOptions = () => radios('Show myFT sign out link', { show: true, hide: '' }, '')
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
    return (
      <OrigamiBuildService dependencies={OrigamiDependecies}>
        <HeaderDefault {...storyData} />
      </OrigamiBuildService>
    )
  })
  .add('Logo only', () => {
    let optionalProps = { options: { variant: toggleVariantOptions() } }
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <LogoOnly {...optionalProps} />
      </OrigamiBuildService>
    )
  })
  .add('With crumbtrail component', () => {
    // TODO: can we delete this?! It's weird.
    storyData.options.showSignOut = toggleSignOutOptions()
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderWithCrumbtrail {...storyData} />
      </OrigamiBuildService>
    )
  })
