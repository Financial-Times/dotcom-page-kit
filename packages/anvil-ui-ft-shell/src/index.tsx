import React from 'react'
import { AnyObject } from '@financial-times/anvil-types-generic'
import fs from 'fs'
import path from 'path'

const bootstrap = fs.readFileSync(path.join(__dirname, 'bootstrap.js')).toString()

interface Props {
  children: any
  initialProps: AnyObject
  scriptsToLoad: string[]
}

export default function Shell({ children, scriptsToLoad = [], initialProps = {} }: Partial<Props>) {
  return (
    <html className="no-js core">
      <head>
        <meta charSet="utf-8" />
        <title>{/* TODO Configurable title text */}Financial Times</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* TODO: Metadata slot */}
        <script
          type="application/json"
          id="initial-props"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(initialProps) }}
        />
        <script
          type="application/json"
          id="scripts-config"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptsToLoad) }}
        />
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        {/* TODO: Critical CSS */}
      </head>
      <body>{children}</body>
    </html>
  )
}
