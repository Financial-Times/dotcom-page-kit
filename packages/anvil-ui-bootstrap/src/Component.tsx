import React from 'react'
import { formatConfigJSON, getBootstrapJS } from './index'

export type TBootstrapProps = {
  coreScripts: string[]
  enhancedScripts: string[]
}

export function Bootstrap(props: TBootstrapProps) {
  return (
    <React.Fragment>
      <script
        type="application/json"
        id="bootstrap-config"
        dangerouslySetInnerHTML={{ __html: formatConfigJSON(props.coreScripts, props.enhancedScripts) }}
      />
      <script dangerouslySetInnerHTML={{ __html: getBootstrapJS() }} />
    </React.Fragment>
  )
}
