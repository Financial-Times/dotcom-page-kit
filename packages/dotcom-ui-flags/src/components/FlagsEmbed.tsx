import React from 'react'
import { formatFlagsJSON } from '../server'
import { TFlagsData } from '../types'
import { SCRIPT_ELEMENT_ID } from '../constants'

type TFlagsEmbedProps = {
  flags?: TFlagsData
}

function FlagsEmbed({ flags }: TFlagsEmbedProps) {
  return (
    <script
      type="application/json"
      id={SCRIPT_ELEMENT_ID}
      dangerouslySetInnerHTML={{ __html: formatFlagsJSON(flags) }}
    />
  )
}

FlagsEmbed.defaultProps = {
  flags: {}
}

export { FlagsEmbed, TFlagsEmbedProps }
