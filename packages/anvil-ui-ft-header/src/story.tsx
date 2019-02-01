import React from 'react'
import { HeaderMain, HeaderWithCrumbtrail, LogoOnly, HeaderSimpleNav } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, radios } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './story-data/storyData'

const userStateOptions = ['Show UserNav navigation links', true]
const showSignOutOptions = ['Show myFT crumbtrail sign out link', true]
const viewStyleOptions = ['Enable compact variant', { on: 'compact', off: '' }, '']

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
        <HeaderMain {...storyData} userNav={toggleHeaderOptions} />
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
  .add('simple-nav', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <HeaderSimpleNav {...storyData} />
      </OrigamiBuildService>
    )
  })
