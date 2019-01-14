import React from 'react'
import { Footer, LegalFooter } from '.'
import { storiesOf } from '@storybook/react'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'
import sampleData from './components/sampleData'

storiesOf('FT / Footer', module)
  .add('Footer', () => (
    <OrigamiBuildService
      dependencies={{
        'o-footer': '^6.0.10',
        'o-fonts': '^3.2.0',
        'o-normalise': '^1.6.2'
      }}>
      <Footer {...sampleData} />
    </OrigamiBuildService>
  ))
  .add('Legal Footer', () => (
    <OrigamiBuildService
      dependencies={{
        'o-footer': '^6.0.10',
        'o-fonts': '^3.2.0',
        'o-normalise': '^1.6.2'
      }}>
      <LegalFooter {...sampleData} />
    </OrigamiBuildService>
  ))
