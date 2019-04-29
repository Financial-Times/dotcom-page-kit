import React from 'react'
import Body, { TBodyProps } from './Body'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import StyleSheets, { TStylesheetProps } from './StyleSheets'
import { Flags, TFlagsProps } from '@financial-times/anvil-ui-ft-flags'
import { Bootstrap } from '@financial-times/anvil-ui-bootstrap/component'
import formatAttributeNames, { TAttributeData } from '../lib/formatAttributeNames'
import * as polyfillServiceURLs from '../lib/polyfillServiceURLs'

type TShellProps = TDocumentHeadProps &
  TStylesheetProps &
  TBodyProps &
  TFlagsProps & {
    children?: any
    initialProps?: any
    coreScripts?: string[]
    enhancedScripts?: string[]
    bodyAttributes?: TAttributeData
    htmlAttributes?: TAttributeData
  }

function Shell(props: TShellProps) {
  const coreScripts = [polyfillServiceURLs.core, ...props.coreScripts]
  const enhancedScripts = [polyfillServiceURLs.enhanced, ...props.enhancedScripts]

  return (
    <html {...formatAttributeNames(props.htmlAttributes)} className="no-js core">
      <head>
        <DocumentHead {...props} />
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <Flags flags={props.flags} />
        <StyleSheets stylesheets={props.stylesheets} criticalStyles={props.criticalStyles} />
        <Bootstrap coreScripts={coreScripts} enhancedScripts={enhancedScripts} />
      </head>
      <Body {...formatAttributeNames(props.bodyAttributes)} contents={props.contents || props.children} />
    </html>
  )
}

Shell.defaultProps = {
  coreScripts: [],
  enhancedScripts: [],
  htmlAttributes: {},
  bodyAttributes: {}
}

export { Shell, TShellProps }
