import React from 'react'
import Shell from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

storiesOf('FT / Shell', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const someText = text('someText', 'foo')
    return <Shell>{someText}</Shell>
  })
