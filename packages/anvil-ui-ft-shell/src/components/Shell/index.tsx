import React from 'react'
import { AnyObject } from '@financial-times/anvil-types-generic'
import DocumentHead, { TDocumentHeadProps } from '../DocumentHead'
import Flags, { TFlagComponentProps } from '@financial-times/anvil-ui-ft-flags'
import { getBootstrapJS, formatConfigJSON } from '@financial-times/anvil-ui-bootstrap'
import { corePolyfillServiceUrl, enhancedPolyfillServiceUrl } from '../../polyfill'

interface Props extends TDocumentHeadProps {
  children?: any
  flags?: TFlagComponentProps
  initialProps?: AnyObject
  coreScriptsToLoad?: string[]
  enhancedScriptsToLoad?: string[]
}

function Shell(props: Props) {
  const coreScripts = [corePolyfillServiceUrl, ...props.coreScriptsToLoad]
  const enhancedScripts = [enhancedPolyfillServiceUrl, ...props.enhancedScriptsToLoad]
  const bootstrapConfig = formatConfigJSON(coreScripts, enhancedScripts)

  return (
    <html className="no-js core">
      <head>
        <DocumentHead {...props} />
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        {props.flags && <Flags flags={props.flags} />}
        <script
          id="bootstrap-config"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: bootstrapConfig }}
        />
        <script dangerouslySetInnerHTML={{ __html: getBootstrapJS() }} />
      </head>
      <Body contents={props.children} />
    </html>
  )
}

Shell.defaultProps = {
  coreScriptsToLoad: [],
  enhancedScriptsToLoad: []
}

function Body({ contents }) {
  if (typeof contents === 'string') {
    return <body dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return <body>{contents}</body>
  }
}

export default Shell
