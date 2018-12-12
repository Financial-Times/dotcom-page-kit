import React from 'react'
import FTHeader from '.'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const someText = text('someText', 'foo')
    return <FTHeader>{someText}</FTHeader>
  })
