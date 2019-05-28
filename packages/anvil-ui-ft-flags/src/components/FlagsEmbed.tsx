import React from 'react'
import { formatFlagsJSON } from '../server'
import { TFlagsData } from '../types'

type TFlagsEmbedProps = {
  flags?: TFlagsData
}

function FlagsEmbed({ flags }: TFlagsEmbedProps) {
  return (
    <script
      type="application/json"
      id="anvil-flags-data"
      dangerouslySetInnerHTML={{ __html: formatFlagsJSON(flags) }}
    />
  )
}

FlagsEmbed.defaultProps = {
  flags: {}
}

export { FlagsEmbed, TFlagsEmbedProps }
