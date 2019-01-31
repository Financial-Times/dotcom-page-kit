import React from 'react'
import { Expander } from './Expander'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { init } from './clientside'
import './styles.scss'

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
    const buttonText = text('Toggle button text', 'Show loader')
    return <Expander buttonText={buttonText} />
  }
}

storiesOf('Bower Test', module)
  .addDecorator(withKnobs)
  .add('Origami JS and SCSS', () => {
    return <ExpanderWithLifecycle />
  })
