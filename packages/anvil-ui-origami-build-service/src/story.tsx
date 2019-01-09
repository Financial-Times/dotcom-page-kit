import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '.'

storiesOf('Origami / BuildService', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const someText = text('text', 'foo')
    return (
      <OrigamiBuildService
        dependencies={{
          'o-normalise': '^1.6.0',
          'o-date': '^2.11.0',
          'o-typography': '^5.5.0',
          'o-teaser': '^2.3.0',
          'o-labels': '^3.0.0',
          'o-video': '^4.1.0'
        }}>
        <div className="o-typography-heading-level-2">{someText}</div>
      </OrigamiBuildService>
    )
  })
