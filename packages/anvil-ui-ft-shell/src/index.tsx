import React from 'react'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { getBootstrapJS, formatConfigJSON } from '@financial-times/anvil-ui-bootstrap'
import { corePolyfillServiceUrl, enhancedPolyfillServiceUrl } from './polyfill'

interface Props {
  children: any
  pageTitle: string
  siteTitle: string
  initialProps: AnyObject
  coreScriptsToLoad: string[]
  enhancedScriptsToLoad: string[]
}

export default function Shell({
  children,
  pageTitle,
  siteTitle,
  coreScriptsToLoad = [],
  enhancedScriptsToLoad = [],
  initialProps = {}
}: Partial<Props>) {
  const coreScripts = [corePolyfillServiceUrl, ...coreScriptsToLoad]
  const enhancedScripts = [enhancedPolyfillServiceUrl, ...enhancedScriptsToLoad]
  const bootstrapConfig = formatConfigJSON(coreScripts, enhancedScripts)

  return (
    <html className="no-js core">
      <head>
        <meta charSet="utf-8" />
        <title>{pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* TODO: Metadata slot */}
        <script
          id="initial-props"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(initialProps) }}
        />
        <script
          id="bootstrap-config"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: bootstrapConfig }}
        />
        <script dangerouslySetInnerHTML={{ __html: getBootstrapJS() }} />
        {/* TODO: Critical CSS */}
      </head>
      <body>{children}</body>
    </html>
  )
}
