import React from 'react'

/* UI components need to be initialized after they have rendered */
/* to pull in JavaScript from the relevant Origami packages */

type TOnReadyProps = {
  callback: () => void
  children: React.ReactNode
}

export class OnReady extends React.Component<TOnReadyProps> {
  constructor(props: TOnReadyProps) {
    super(props)
  }

  componentDidMount() {
    this.props.callback()
  }

  render() {
    return this.props.children || null
  }
}
