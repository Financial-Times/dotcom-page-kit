import React from 'react'
import { Expander } from './Expander'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { init } from './clientside'

class ExpanderWithLifecycle extends React.Component {
  componentDidMount() {
    this.toggle = init()
  }

  componentWillUnmount() {
    if (this.toggle) {
      this.toggle.destroy()
      delete this.toggle
    }
  }

  render() {
    const buttonText = text('Toggle button text', 'Expand')
    const textContent = text('Text content', 'Lorem ipsum doler sit amet.')

    return <Expander buttonText={buttonText} textContent={textContent} />
  }
}

storiesOf('Bower Test', module)
  .addDecorator(withKnobs)
  .add('footer', () => {
    return <ExpanderWithLifecycle />
  })
