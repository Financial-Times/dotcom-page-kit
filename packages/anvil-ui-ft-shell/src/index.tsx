import React from 'react'
import { AnyObject } from '@financial-times/anvil-types-generic'

interface Props {
  children: any
  initialProps: AnyObject
  scriptsToLoad: string[]
}

export default function Shell({ children, scriptsToLoad = [], initialProps = {} }: Partial<Props>) {
  const stringifiedInitialProps = JSON.stringify(initialProps)

  // prettier-ignore
  return (
    <html className="no-js core">
      <head>
        <meta charSet="utf-8" />
        <title>Page...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: `
          var doc = document.documentElement

          // For hydration later on
          window.initialProps = JSON.parse('${stringifiedInitialProps}')

          // Flag that JS is available
          doc.className = doc.className.replace('no-js', 'js')

          function scriptLoadError(error) {
            // Log the script failure somehow
            console.error(error)
          }

          function loadScript(src) {
            var script = document.createElement('script')
            script.onerror = scriptLoadError
            script.async = false
            script.src = src
            document.head.appendChild(script)
          }

          // Cut the mustard like it's 2012
          var enhanced = (function() {
            return 'querySelector' in doc && 'classList' in doc
          })()

          if (enhanced) {
            // flag that we will now try to deliver an ehanced experience
            doc.className = doc.className.replace('core', 'enhanced')

            const scripts = [
              'https://cdn.polyfill.io/v2/polyfill.min.js?features=default,HTMLPictureElement,fetch',
              ${scriptsToLoad.map(script => `'${script}'`).join(',\n\t\t\t\t')}
            ]

            scripts.forEach(function(script) {
              loadScript(script)
            })
          } else {
            loadScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=HTMLPictureElement')
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
