import React from 'react'
import Content, { TContentProps } from './Content'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import StyleSheets, { TStylesheetProps } from './StyleSheets'
import ResourceHints, { TResourceHintsProps } from './ResourceHints'
import { AppContextEmbed, TAppContextProps } from '@financial-times/dotcom-ui-app-context'
import { fontFaceURLs, documentStyles } from '@financial-times/dotcom-ui-base-styles'
import { FlagsEmbed, TFlagsEmbedProps } from '@financial-times/dotcom-ui-flags'
import { Bootstrap, TBootstrapProps } from '@financial-times/dotcom-ui-bootstrap'
import formatAttributeNames, { TAttributeData } from '../lib/formatAttributeNames'
import GTMHead from './GTMHead'
import GTMBody from './GTMBody'

type TShellProps = TDocumentHeadProps &
  TAppContextProps &
  TStylesheetProps &
  TResourceHintsProps &
  TContentProps &
  TFlagsEmbedProps & {
    scripts?: string[]
    children?: any
    initialProps?: any
    bodyAttributes?: TAttributeData
    htmlAttributes?: TAttributeData
  }

function Shell(props: TShellProps) {
  const bootstrapProps: TBootstrapProps = {
    coreScripts: [],
    enhancedScripts: props.scripts
  }

  const resourceHints = [
    // There is no need to include stylesheets here as any <link rel="stylesheet" /> tags
    // should be found by the browser's speculative parser.
    ...props.scripts,
    ...props.resourceHints,
    ...fontFaceURLs
  ]

  return (
    <html
      {...formatAttributeNames(props.htmlAttributes)}
      lang="en-GB"
      className="no-js core"
      style={documentStyles}
    >
      <head>
        <DocumentHead {...props} />
        <ResourceHints resourceHints={resourceHints} />
        {/* TODO: refactor initial props, flags data, and context data to the bottom of body */}
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <StyleSheets
          criticalStyles={props.criticalStyles}
          stylesheets={props.stylesheets}
          asyncStylesheets={props.asyncStylesheets}
        />
        <Bootstrap {...bootstrapProps} />
        <GTMHead flags={props.flags} />
      </head>
      <body {...formatAttributeNames(props.bodyAttributes)}>
        <GTMBody flags={props.flags} />
        <Content contents={props.contents || props.children} />
        <AppContextEmbed appContext={props.appContext} />
        <FlagsEmbed flags={props.flags} />
      </body>
    </html>
  )
}

Shell.defaultProps = {
  scripts: [],
  stylesheets: [],
  asyncStylesheets: [],
  resourceHints: [],
  htmlAttributes: {},
  bodyAttributes: {
    dataO3Brand: 'core'
  }
}

export { Shell }
export type { TShellProps }

// Export sub-components to more-easily enable custom integrations
export { DocumentHead, ResourceHints, Content }
