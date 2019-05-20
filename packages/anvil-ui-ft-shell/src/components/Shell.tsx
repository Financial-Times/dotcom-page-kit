import React from 'react'
import Body, { TBodyProps } from './Body'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import StyleSheets, { TStylesheetProps } from './StyleSheets'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { Flags, TFlagsProps } from '@financial-times/anvil-ui-ft-flags'
import { Bootstrap, TBootstrapProps } from '@financial-times/anvil-ui-bootstrap'
import formatAttributeNames, { TAttributeData } from '../lib/formatAttributeNames'

type TShellProps = TDocumentHeadProps &
  TStylesheetProps &
  TBodyProps &
  TFlagsProps &
  TBootstrapProps & {
    children?: any
    appContext?: AnyObject
    initialProps?: any
    bodyAttributes?: TAttributeData
    htmlAttributes?: TAttributeData
  }

function Shell(props: TShellProps) {
  const htmlTagProps = {
    ...formatAttributeNames(props.htmlAttributes),
    ...formatAttributeNames(props.appContext, { prefix: 'data' })
  }

  return (
    <html {...htmlTagProps} className="no-js core">
      <head>
        <DocumentHead {...props} />
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <script
          id="ft-app-context"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.appContext) }}
        />
        <Flags flags={props.flags} />
        <StyleSheets stylesheets={props.stylesheets} criticalStyles={props.criticalStyles} />
        <Bootstrap coreScripts={props.coreScripts} enhancedScripts={props.enhancedScripts} />
      </head>
      <Body {...formatAttributeNames(props.bodyAttributes)} contents={props.contents || props.children} />
    </html>
  )
}

Shell.defaultProps = {
  appContext: {},
  coreScripts: [],
  enhancedScripts: [],
  htmlAttributes: {},
  bodyAttributes: {}
}

export { Shell, TShellProps }
