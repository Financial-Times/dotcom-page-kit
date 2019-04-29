import React from 'react'
import { formatFlagsJSON } from '../server'
import { TFlagsData } from '../types'

export type TFlagsProps = {
  flags: TFlagsData
}

export function Flags(props: TFlagsProps) {
  return (
    <script
      type="application/json"
      id="anvil-flags-data"
      dangerouslySetInnerHTML={{ __html: formatFlagsJSON(props.flags) }}
    />
  )
}
