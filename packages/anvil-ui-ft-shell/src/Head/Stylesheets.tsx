import React from 'react'

const Stylesheets = ({ stylesheets, criticalStyles }) => (
  <React.Fragment>
    <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
    {stylesheets && stylesheets.map((stylesheet) => <link rel="stylesheet" href={stylesheet} />)}
  </React.Fragment>
)

Stylesheets.defaultProps = {
  criticalStyles: 'background-color: #fff1e5;'
}

export default Stylesheets
