import React from 'react'

export interface TFlagComponentProps {
  flags: { [key: string]: string | boolean }
}

const Flags = (props: TFlagComponentProps) => (
  <script id="flags-config" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.flags) }} />
)

Flags.defaultProps = {
  flags: {}
}

export default Flags
