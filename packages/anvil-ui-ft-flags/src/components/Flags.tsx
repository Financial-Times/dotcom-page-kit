import React from 'react'
import { formatFlagsJSON } from '../server'
import { TFlagsData } from '../types'

type TFlagsProps = {
  flags?: TFlagsData
}

function Flags({ flags }: TFlagsProps) {
  return (
    <script
      type="application/json"
      id="anvil-flags-data"
      dangerouslySetInnerHTML={{ __html: formatFlagsJSON(flags) }}
    />
  )
}

Flags.defaultProps = {
  flags: {}
}

export { Flags, TFlagsProps }
