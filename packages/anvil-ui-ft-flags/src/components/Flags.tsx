import React from 'react'

export interface FlagComponentProps {
  flags: { [key: string]: string | boolean }
}

const Flags = ({ flags }: FlagComponentProps) => (
  <script id="flags-config" dangerouslySetInnerHTML={{ __html: JSON.stringify(flags) }} />
)

Flags.defaultProps = {
  flags: {}
}

export default Flags
