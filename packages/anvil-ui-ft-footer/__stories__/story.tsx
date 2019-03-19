import React from 'react'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'

import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import { Footer, LegalFooter } from '../src'
import storyData from './story-data'
import '../styles.scss'

const toggleTheme = () =>
  radios(
    'Theme',
    {
      dark: 'dark',
      light: 'light'
    },
    'dark'
  )

storiesOf('FT / Footer', module)
  .addDecorator(withKnobs)
  .add('footer', () => {
    return (
      <OnReady>
        <Footer {...storyData} theme={toggleTheme()} />
      </OnReady>
    )
  })
  .add('legal footer', () => {
    return (
      <OnReady>
        <LegalFooter {...storyData} theme={toggleTheme()} />
      </OnReady>
    )
  })
