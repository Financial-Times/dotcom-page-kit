import React from 'react'
import loadAsyncStylesheetsString from '../lib/loadAsyncStylesheets'

export type TStylesheetProps = {
  criticalStyles?: string
  stylesheets?: string[]
  asyncStylesheets?: string[]
}

const Stylesheets = ({ criticalStyles, stylesheets, asyncStylesheets }: TStylesheetProps) => (
  <React.Fragment>
    {criticalStyles && <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />}
    {Array.isArray(stylesheets) &&
      stylesheets.map((stylesheet, i) => <link rel="stylesheet" key={`stylesheet-${i}`} href={stylesheet} />)}
    {Array.isArray(asyncStylesheets) && !!asyncStylesheets.length && (
      <React.Fragment>
        <noscript>
          {asyncStylesheets.map((stylesheet, i) => (
            <link rel="stylesheet" href={stylesheet} key={`async-stylesheet-${i}`} />
          ))}
        </noscript>
        <script
          data-stylesheets={asyncStylesheets.join()}
          dangerouslySetInnerHTML={{ __html: loadAsyncStylesheetsString }}></script>
      </React.Fragment>
    )}
  </React.Fragment>
)

Stylesheets.defaultProps = {
  stylesheets: [],
  asyncStylesheets: []
}

export default Stylesheets
