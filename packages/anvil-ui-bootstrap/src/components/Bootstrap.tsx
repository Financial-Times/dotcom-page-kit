import React from 'react'
import { formatConfigJSON, getBootstrapJS } from '../server'

type TBootstrapProps = {
  coreScripts?: string[]
  enhancedScripts?: string[]
}

function Bootstrap({ coreScripts, enhancedScripts }: TBootstrapProps) {
  return (
    <React.Fragment>
      <script
        type="application/json"
        id="anvil-bootstrap-config"
        dangerouslySetInnerHTML={{ __html: formatConfigJSON(coreScripts, enhancedScripts) }}
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
