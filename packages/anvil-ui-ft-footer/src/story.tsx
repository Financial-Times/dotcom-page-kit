import React from 'react'
import { Footer, LegalFooter } from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import sampleData from './storyData'

const toggleTheme = () => radios('Theme', { dark: 'dark', light: 'light' }, 'dark')

storiesOf('FT / Footer', module)
  .addDecorator(withKnobs)
  .add('footer', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-footer': '^6.0.10',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <Footer {...sampleData} theme={toggleTheme()} />
      </OrigamiBuildService>
    )
  })
  .add('legal footer', () => {
    return (
      <OrigamiBuildService
        dependencies={{
          'o-footer': '^6.0.10',
          'o-fonts': '^3.2.0',
          'o-normalise': '^1.6.2'
        }}>
        <LegalFooter {...sampleData} theme={toggleTheme()} />
      </OrigamiBuildService>
    )
  })
