import React from 'react'
import Body, { TBodyProps } from './Body'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import { Flags } from '@financial-times/anvil-ui-ft-flags/component'
import { Bootstrap } from '@financial-times/anvil-ui-bootstrap/component'
import { corePolyfillServiceUrl, enhancedPolyfillServiceUrl } from '../lib/polyfillServiceURLs'

type TShellProps = TDocumentHeadProps &
  TBodyProps & {
    children?: any
    flags?: { [key: string]: boolean | string }
    initialProps?: any
    coreScripts?: string[]
    enhancedScripts?: string[]
  }

function Shell(props: TShellProps) {
  const coreScripts = [corePolyfillServiceUrl, ...props.coreScripts]
  const enhancedScripts = [enhancedPolyfillServiceUrl, ...props.enhancedScripts]

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
      <Body contents={props.contents || props.children} />
    </html>
  )
}

Shell.defaultProps = {
  coreScripts: [],
  enhancedScripts: []
}

export { Shell, TShellProps }
