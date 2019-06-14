import React from 'react'

/* UI components need to be initialized after they have rendered */
/* to pull in JavaScript from the relevant Origami packages */

type TOnReadyProps = {
  callback: () => void
  children: React.ReactNode
}

export class OnReady extends React.Component<TOnReadyProps> {
  private mounted

  constructor(props: TOnReadyProps) {
    super(props)
    this.mounted = React.createRef()
  }

  componentDidMount() {
    this.props.callback()
  }

  componentDidUpdate() {
    // Only trigger the callback if the component is actually rendered as a DOM node
    if (this.mounted.current) {
      this.props.callback()
    }
  }

  render() {
    // HACK: By appending an attribute with a value that will change this will force a
    // rerender of this component and its children unless they use React.PureComponent
    // or implement .shouldComponentUpdate().
    // <https://github.com/Financial-Times/anvil/pull/283>
    return (
      <div data-rerender-hack={Date.now()} style={{ display: 'contents' }} ref={this.mounted}>
        {this.props.children || null}
      </div>
    )
  }
}
