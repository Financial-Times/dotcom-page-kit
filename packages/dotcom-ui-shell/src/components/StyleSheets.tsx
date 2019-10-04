import React from 'react'

export type TStylesheetProps = {
  stylesheets?: string[]
  criticalStyles?: string
  asyncStylesheets?: string[]
}

const Stylesheets = ({ stylesheets, criticalStyles, asyncStylesheets }: TStylesheetProps) => (
  <React.Fragment>
    {criticalStyles && <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />}
    {Array.isArray(stylesheets) &&
      stylesheets.map((stylesheet, i) => <link rel="stylesheet" key={`stylesheet-${i}`} href={stylesheet} />)}
    {/*
      Load stylesheets asyncronously. See: 
      https://www.filamentgroup.com/lab/load-css-simpler/
      https://w3c.github.io/preload/#example-5
    */}
    {Array.isArray(asyncStylesheets) &&
      asyncStylesheets.map((stylesheet, i) => (
        <link rel="stylesheet" key={`async-stylesheet-${i}`} href={stylesheet} media="print" />
      ))}
  </React.Fragment>
)

Stylesheets.defaultProps = {
  stylesheets: [],
  asyncStylesheets: []
}

export default Stylesheets
