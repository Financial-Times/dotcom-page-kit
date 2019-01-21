import React from 'react'
import { Header } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import storyData from './storyData'

const userStateOptions = ['User state', { user: true, anon: null }, 'true']

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('header', () => {
    const toggleUserState = radios(...userStateOptions)
    return (
      <OrigamiBuildService
        dependencies={{
          'o-header': '^7.7.0',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <Header {...storyData} userNav={toggleUserState} />
      </OrigamiBuildService>
    )
  })
