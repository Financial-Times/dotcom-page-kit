import React from 'react'
import formatFlagsJSON from './formatFlagsJSON'
import { TFlagsData } from './types'

export type TFlagsProps = {
  data: TFlagsData
}

export function Flags(props: TFlagsProps) {
  return (
    <script type="application/json" id="flags-data">
      {formatFlagsJSON(props.data)}
    </script>
  )
}
