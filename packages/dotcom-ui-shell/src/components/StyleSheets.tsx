import React from 'react'

export type TStylesheetProps = {
  stylesheets?: string[]
  criticalStyles?: string
}

const Stylesheets = ({ stylesheets, criticalStyles }: TStylesheetProps) => (
  <React.Fragment>
    {criticalStyles && <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />}
    {Array.isArray(stylesheets) &&
      stylesheets.map((stylesheet, i) => <link rel="stylesheet" key={`stylesheet-${i}`} href={stylesheet} />)}
  </React.Fragment>
)

Stylesheets.defaultProps = {
  stylesheets: []
}

export default Stylesheets
