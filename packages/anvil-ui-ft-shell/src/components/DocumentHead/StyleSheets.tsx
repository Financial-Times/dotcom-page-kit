import React from 'react'
import { TDocumentHeadProps } from './'

const Stylesheets = ({ stylesheets = [], criticalStyles }: TDocumentHeadProps) => (
  <React.Fragment>
    {criticalStyles && <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />}
    {Array.isArray(stylesheets) &&
      stylesheets.map((stylesheet, i) => <link rel="stylesheet" key={`stylesheet-${i}`} href={stylesheet} />)}
  </React.Fragment>
)

Stylesheets.defaultProps = {
  criticalStyles: 'background-color: #fff1e5;'
}

export default Stylesheets
