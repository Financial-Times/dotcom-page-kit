import React from 'react'
import { Header, HeaderWithCrumbtrail, LogoOnly } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './story-data/storyData'

const userStateOptions = ['User is logged in', true]
const showSignOutOptions = ['Show sign out link', true]

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('header', () => {
    const toggleHeaderOptions = boolean(...userStateOptions)
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <Header {...storyData} userNav={toggleHeaderOptions} />
      </OrigamiBuildService>
    )
  })
  .add('with-crumbtrail', () => {
    const toggleUserStateOptions = boolean(...userStateOptions)
    const toggleSignOutOptions = boolean(...showSignOutOptions)
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderWithCrumbtrail
          {...storyData}
          userNav={toggleUserStateOptions}
          showSignOut={toggleSignOutOptions}
        />
      </OrigamiBuildService>
    )
  })
  .add('logo-only', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <LogoOnly />
      </OrigamiBuildService>
    )
  })
