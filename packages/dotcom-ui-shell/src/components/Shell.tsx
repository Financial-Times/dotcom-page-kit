import React from 'react'
import Content, { TContentProps } from './Content'
import DocumentHead, { TDocumentHeadProps } from './DocumentHead'
import StyleSheets, { TStylesheetProps } from './StyleSheets'
import ResourceHints, { TResourceHintsProps } from './ResourceHints'
import { AppContextEmbed, TAppContextProps } from '@financial-times/dotcom-ui-app-context'
import { FlagsEmbed, TFlagsEmbedProps } from '@financial-times/dotcom-ui-flags'
import { Bootstrap, TBootstrapProps } from '@financial-times/dotcom-ui-bootstrap'
import * as polyfillService from '@financial-times/dotcom-ui-polyfill-service'
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
    coreScripts: [polyfillService.core()],
    enhancedScripts: [polyfillService.enhanced(), ...props.scripts]
  }

  const resourceHints = [
    polyfillService.enhanced(),
    // There is no need to include stylesheets here as any <link rel="stylesheet" /> tags
    // should be found by the browser's speculative parser.
    ...props.scripts,
    ...props.resourceHints,
    // TODO: abstract font URLs into 'core branding' package
    '/__origami/service/build/v2/files/o-fonts-assets@1.3.2/MetricWeb-Regular.woff',
    '/__origami/service/build/v2/files/o-fonts-assets@1.3.2/MetricWeb-Semibold.woff',
    '/__origami/service/build/v2/files/o-fonts-assets@1.3.2/FinancierDisplayWeb-Regular.woff',
    '/__origami/service/build/v2/files/o-fonts-assets@1.3.2/FinancierDisplayWeb-Bold.woff'
  ]

  return (
    <html
      {...formatAttributeNames(props.htmlAttributes)}
      lang="en-GB"
      className="no-js core"
      style={{
        // TODO: abstract styles into 'core branding' package
        // Enable use of 100vw which does not account for the scroll bar
        overflowX: 'hidden',
        backgroundColor: '#fff1e5',
        color: '#33302e'
      }}>
      <head>
        <DocumentHead {...props} />
        <ResourceHints resourceHints={resourceHints} />
        {/* TODO: refactor initial props, flags data, and context data to the bottom of body */}
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.initialProps) }}
        />
        <StyleSheets stylesheets={props.stylesheets} criticalStyles={props.criticalStyles} />
        <Bootstrap {...bootstrapProps} />
        <GTMHead flags={props.flags} />
      </head>
      <body {...formatAttributeNames(props.bodyAttributes)}>
        <GTMBody flags={props.flags} />
        <Content contents={props.contents || props.children} />
        <AppContextEmbed context={props.context} />
        <FlagsEmbed flags={props.flags} />
      </body>
    </html>
  )
}

Shell.defaultProps = {
  scripts: [],
  stylesheets: [],
  resourceHints: [],
  htmlAttributes: {},
  bodyAttributes: {}
}

export { Shell, TShellProps }

// Export sub-components to more-easily enable custom integrations
export { DocumentHead, ResourceHints, Content }
