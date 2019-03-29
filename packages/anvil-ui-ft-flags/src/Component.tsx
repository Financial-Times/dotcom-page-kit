import React from 'react'
import formatFlagsJSON from './formatFlagsJSON'
import { TFlagsData } from './types'

export type TFlagsProps = {
  data: TFlagsData
}

export function Flags(props: TFlagsProps) {
  return (
    <script
      type="application/json"
      id="anvil-flags-data"
      dangerouslySetInnerHTML={{ __html: formatFlagsJSON(props.data) }}
    />
  )
}
