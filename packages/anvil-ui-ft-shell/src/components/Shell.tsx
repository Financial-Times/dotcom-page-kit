import React from 'react'
import Body, { TBodyProps } from './Body'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import StyleSheets, { TStylesheetProps } from './StyleSheets'
import { FlagsEmbed, TFlagsEmbedProps } from '@financial-times/anvil-ui-ft-flags'
import { Bootstrap, TBootstrapProps } from '@financial-times/anvil-ui-bootstrap'
import formatAttributeNames, { TAttributeData } from '../lib/formatAttributeNames'

type TShellProps = TDocumentHeadProps &
  TStylesheetProps &
  TBodyProps &
  TFlagsEmbedProps &
  TBootstrapProps & {
    children?: any
    initialProps?: any
    bodyAttributes?: TAttributeData
    htmlAttributes?: TAttributeData
  }

function Shell(props: TShellProps) {
  return (
    <html
      {...formatAttributeNames(props.htmlAttributes)}
      className="no-js core"
      style={{ backgroundColor: '#fff1e5', color: '#33302e' }}>
      <head>
        <DocumentHead {...props} />
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <FlagsEmbed flags={props.flags} />
        <StyleSheets stylesheets={props.stylesheets} criticalStyles={props.criticalStyles} />
        <Bootstrap
          coreScripts={props.coreScripts}
          enhancedScripts={props.enhancedScripts}
          trackErrors={true}
        />
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
