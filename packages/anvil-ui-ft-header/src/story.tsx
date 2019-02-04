import React from 'react'
import { HeaderMain, HeaderMobileNav, HeaderWithCrumbtrail, LogoOnly, HeaderWithUserNav } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, radios } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './story-data/storyData'

const userStateOptions = ['UserNav option is true', true]
const showSignOutOptions = ['Show myFT crumbtrail sign out link', false]
const viewStyleOptions = ['Enable compact variant', { on: 'compact', off: '' }, '']
const userAnonymousOptions = ['User is anonymous', false]

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('header', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderMain {...storyData} />
      </OrigamiBuildService>
    )
  })
  .add('simple-nav', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderMobileNav {...storyData} />
      </OrigamiBuildService>
    )
  })
  .add('logo-only', () => {
    const toggelViewStyleOptions = radios(...viewStyleOptions)
    const PropsViewStyle = { viewStyle: 'compact' }
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <LogoOnly {...PropsViewStyle} viewStyle={toggelViewStyleOptions} />
      </OrigamiBuildService>
    )
  })
  .add('with-crumbtrail', () => {
    const toggleSignOutOptions = boolean(...showSignOutOptions)
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderWithCrumbtrail {...storyData} showSignOut={toggleSignOutOptions} />
      </OrigamiBuildService>
    )
  })
  .add('with-userNav', () => {
    const toggleUserStateOptions = boolean(...userStateOptions)
    const toggleAnonymous = boolean(...userAnonymousOptions)
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderWithUserNav
          {...storyData}
          userNav={toggleUserStateOptions}
          userIsAnonymous={toggleAnonymous}
        />
      </OrigamiBuildService>
    )
  })
