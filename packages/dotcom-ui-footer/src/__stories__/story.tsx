import React from 'react'
import { OnReady } from '../../../../.storybook/components/OnReady'

import storyData from './story-data'

import * as footer from '../../browser.js'
import { Footer, LegalFooter } from '../../src'
import '../../styles.scss'

export default {
  title: 'FT / Footer',
  args: { theme: 'dark' },
  argTypes: {
    theme: {
      control: {
        type: 'radio',
        options: ['dark', 'light']
      }
    }
  }
}

export const _Footer = (args) => {
  return (
    <OnReady callback={() => footer.init()}>
      <Footer {...storyData} {...args} />
    </OnReady>
  )
}

_Footer.story = {
  name: 'footer'
}

export const _LegalFooter = (args) => {
  return (
    <OnReady callback={() => footer.init()}>
      <LegalFooter {...storyData} {...args} />
    </OnReady>
  )
}

_LegalFooter.story = {
  name: 'legal footer'
}
