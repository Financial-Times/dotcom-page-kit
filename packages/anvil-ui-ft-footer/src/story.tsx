import React from 'react'
import Footer from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

storiesOf('FT / Footer', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const someText = text('someText', 'foo')
    return <Footer>{someText}</Footer>
  })
