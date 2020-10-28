import React from 'react'
import { OnReady } from '../../../../.storybook/components/OnReady'

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

export default {
  title: 'FT / Footer',
  decorators: [withKnobs]
}

export const _Footer = () => {
  return (
    <OnReady callback={() => footer.init()}>
      <Footer {...storyData} theme={toggleTheme()} />
    </OnReady>
  )
}

_Footer.story = {
  name: 'footer'
}

export const _LegalFooter = () => {
  return (
    <OnReady callback={() => footer.init()}>
      <LegalFooter {...storyData} theme={toggleTheme()} />
    </OnReady>
  )
}

_LegalFooter.story = {
  name: 'legal footer'
}
