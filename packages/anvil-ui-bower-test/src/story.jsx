import React from 'react'
import { Expander } from './Expander'
import { storiesOf } from '@storybook/react'
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
    return <Expander />
  }
}

storiesOf('Bower Test', module).add('Origami JS and SCSS', () => {
  return <ExpanderWithLifecycle />
})
