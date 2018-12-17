import { AnyObject } from '@financial-times/anvil-types-generic'
import fs from 'fs'
import path from 'path'

const bootstrap = fs.readFileSync(path.join(__dirname, 'bootstrap.js')).toString()

interface Props {
  body: any
  initialProps: AnyObject
  scriptsToLoad: string[]
  htmlAttributes
  bodyAttributes
  siteTitle
  pageTitle
}

function stringifyAttributes(attributes: AnyObject = {}): string {
  return JSON.stringify(attributes)
}

export default function Shell({
  body,
  scriptsToLoad = [],
  initialProps = {},
  htmlAttributes = {},
  bodyAttributes = {},
  siteTitle = '',
  pageTitle = ''
}: Partial<Props>) {
  return `<html className="no-js core" ${stringifyAttributes(htmlAttributes)}>
      <head>
        <meta charSet="utf-8" />
        <title>${pageTitle}${pageTitle ? ' | ' : ''}${siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* TODO: Metadata slot */}
        <script type="application/json" id="initial-props">${JSON.stringify(initialProps)}</script>
        <script type="application/json" id="scripts-config">${JSON.stringify(scriptsToLoad)}</script>
        <script>${bootstrap}</script>
        {/* TODO: Critical CSS */}
      </head>
      <body ${stringifyAttributes(bodyAttributes)}>${body}</body>
    </html>`
}
