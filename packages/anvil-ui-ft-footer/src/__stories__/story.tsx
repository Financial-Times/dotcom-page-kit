import React from 'react'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'

import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'
import storyData from './story-data'

import * as footer from '../../browser.js'
import { Footer, LegalFooter } from '../../src'
import '../../styles.scss'

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
      <OnReady callback={() => footer.init()}>
        <Footer {...storyData} theme={toggleTheme()} />
      </OnReady>
    )
  })
  .add('legal footer', () => {
    return (
      <OnReady callback={() => footer.init()}>
        <LegalFooter {...storyData} theme={toggleTheme()} />
      </OnReady>
    )
  })
