import React from 'react'

/* UI components need to be initialized after they have rendered */
/* to pull in JavaScript from the relevant Origami packages */

interface OnReadyProps {
  callback: Function
  children?: any
}

export class OnReady extends React.Component<OnReadyProps, {}> {
  props: OnReadyProps

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
