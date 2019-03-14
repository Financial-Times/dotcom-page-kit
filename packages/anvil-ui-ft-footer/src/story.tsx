import React from 'react'
import { Footer, LegalFooter } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'
import sampleData from './storyData'
import * as footer from '../browser.js'
import { OnReady } from '../../anvil-ui-ft-on-ready'
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
      <OnReady callback={() => footer.init()}>
        <Footer {...sampleData} theme={toggleTheme()} />
      </OnReady>
    )
  })
  .add('legal footer', () => {
    return (
      <OnReady callback={() => footer.init()}>
        <LegalFooter {...sampleData} theme={toggleTheme()} />
      </OnReady>
    )
  })
