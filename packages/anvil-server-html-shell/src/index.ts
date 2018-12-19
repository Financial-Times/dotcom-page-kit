import { AnyObject } from '@financial-times/anvil-types-generic'
import stringifyAttributes from './stringifyAttributes'
import fs from 'fs'
import path from 'path'

const bootstrap = fs.readFileSync(path.join(__dirname, 'bootstrap.js')).toString()

interface Props {
  body: any
  initialProps?: AnyObject
  scriptsToLoad?: string[]
  htmlAttributes?: AnyObject
  bodyAttributes?: AnyObject
  siteTitle: string
  pageTitle?: string
}

export default function({
  body,
  scriptsToLoad = [],
  initialProps = {},
  htmlAttributes = {},
  bodyAttributes = {},
  siteTitle = '',
  pageTitle = ''
}: Props): string {
  return `<!DOCTYPE html>
    <html class="no-js core" lang="en-GB" ${stringifyAttributes(htmlAttributes)}>
      <head>
        <meta charSet="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>
          ${pageTitle}${pageTitle ? ' | ' : ''}${siteTitle}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- TODO: Metadata slot -->
        <script type="application/json" id="initial-props">${JSON.stringify(initialProps)}</script>
        <script type="application/json" id="scripts-config">${JSON.stringify(scriptsToLoad)}</script>
        <script>${bootstrap}</script>
        <!-- TODO: Critical CSS -->
      </head>
      <body ${stringifyAttributes(bodyAttributes)}>
        ${body}
      </body>
    </html>`
}
