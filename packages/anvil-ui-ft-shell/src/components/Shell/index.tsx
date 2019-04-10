import React from 'react'
import { AnyObject } from '@financial-times/anvil-types-generic'
import DocumentHead, { TDocumentHeadProps } from '../DocumentHead'
import { Flags } from '@financial-times/anvil-ui-ft-flags/component'
import { Bootstrap } from '@financial-times/anvil-ui-bootstrap/component'
import { corePolyfillServiceUrl, enhancedPolyfillServiceUrl } from '../../polyfill'

interface TShellProps extends TDocumentHeadProps {
  children?: any
  flags?: AnyObject
  initialProps?: AnyObject
  coreScriptsToLoad?: string[]
  enhancedScriptsToLoad?: string[]
}

function Shell(props: TShellProps) {
  const coreScripts = [corePolyfillServiceUrl, ...props.coreScriptsToLoad]
  const enhancedScripts = [enhancedPolyfillServiceUrl, ...props.enhancedScriptsToLoad]

  return (
    <html className="no-js core">
      <head>
        <DocumentHead {...props} />
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <Flags data={props.flags} />
        <Bootstrap coreScripts={coreScripts} enhancedScripts={enhancedScripts} />
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

export { Shell, TShellProps }
