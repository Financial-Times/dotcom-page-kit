import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import FTHeader from '.'

storiesOf('FT / Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <FTHeader>{text('someText', 'foo')}</FTHeader>
  })
