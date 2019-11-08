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
    // HACK: By ensuring the key for the rendered element changes this will force a
    // render of the entire component and children unless they use React.PureComponent
    // or implement .shouldComponentUpdate().
    // <https://github.com/Financial-Times/dotcom-page-kit/pull/283>
    return (
      <div key={Date.now()} style={{ display: 'contents' }} ref={this.mounted}>
        {this.props.children || null}
      </div>
    )
  }
}
