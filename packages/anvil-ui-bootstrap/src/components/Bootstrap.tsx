import React from 'react'
import { formatConfigJSON, getBootstrapJS } from '../server'

type TBootstrapProps = {
  trackErrors?: boolean
  coreScripts?: string[]
  enhancedScripts?: string[]
}

function Bootstrap({ coreScripts, enhancedScripts, trackErrors }: TBootstrapProps) {
  return (
    <React.Fragment>
      <script
        type="application/json"
        id="anvil-bootstrap-config"
        dangerouslySetInnerHTML={{ __html: formatConfigJSON(coreScripts, enhancedScripts, trackErrors) }}
      />
      <script dangerouslySetInnerHTML={{ __html: getBootstrapJS() }} />
    </React.Fragment>
  )
}

Bootstrap.defaultProps = {
  coreScripts: [],
  enhancedScripts: []
}

export { Bootstrap, TBootstrapProps }
