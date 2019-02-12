import React from 'react'
import { HeaderDefault, HeaderWithCrumbtrail, LogoOnly } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './story-data/storyData'

// falsey values are empty string because string coercion in storybook
const toggleUserStateOptions = () => radios('Enable user nav actions', { enable: true, disable: '' }, true)
const toggleSignOutOptions = () => radios('Show myFT sign out link', { show: true, hide: '' }, '')
const toggleViewStyleOptions = () => radios('Enable compact variant', { enable: 'compact', disable: '' }, '')
const toggleAnonymous = () => radios('userIsAnonymous', { true: 'true', false: '' }, '')

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
        <HeaderDefault
          {...storyData}
          // userNav={toggleUserStateOptions()}
          // userIsAnonymous={toggleAnonymous()}
        />
      </OrigamiBuildService>
    )
  })
  .add('Logo only', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <LogoOnly viewStyle={toggleViewStyleOptions()} />
      </OrigamiBuildService>
    )
  })
  .add('With crumbtrail component', () => {
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

//showSignOut={toggleSignOutOptions()
