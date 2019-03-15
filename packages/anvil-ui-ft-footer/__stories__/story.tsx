import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import { Footer, LegalFooter } from '../src'
import sampleData from './storyData'
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
    return <Footer {...sampleData} theme={toggleTheme()} />
  })
  .add('legal footer', () => {
    return <LegalFooter {...sampleData} theme={toggleTheme()} />
  })
