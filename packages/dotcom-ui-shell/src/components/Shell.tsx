import React from 'react'
import Body, { TBodyProps } from './Body'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import StyleSheets, { TStylesheetProps } from './StyleSheets'
import { AppContextEmbed, TAppContextProps } from '@financial-times/dotcom-ui-app-context'
import { FlagsEmbed, TFlagsEmbedProps } from '@financial-times/dotcom-ui-flags'
import { Bootstrap, TBootstrapProps } from '@financial-times/dotcom-ui-bootstrap'
import formatAttributeNames, { TAttributeData } from '../lib/formatAttributeNames'
import CoreTracking from './CoreTracking'

type TShellProps = TDocumentHeadProps &
  TAppContextProps &
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
      lang="en-GB"
      className="no-js core"
      style={{ backgroundColor: '#fff1e5', color: '#33302e' }}>
      <head>
        <DocumentHead {...props} />
        {/* TODO: refactor initial props, flags data, and context data to the bottom of body */}
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <FlagsEmbed flags={props.flags} />
        <AppContextEmbed context={props.context} />
        <StyleSheets stylesheets={props.stylesheets} criticalStyles={props.criticalStyles} />
        <Bootstrap
          coreScripts={props.coreScripts}
          enhancedScripts={props.enhancedScripts}
          trackErrors={true}
        />
        <CoreTracking context={props.context} />
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
