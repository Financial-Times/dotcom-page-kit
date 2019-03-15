import React from 'react'

/* UI components need to be initialized after they have rendered */
/* to pull in JavaScript from the relevant Origami packages */

export class OnReady extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.callback()
  }

  render() {
    return this.props.children || null
  }
}
