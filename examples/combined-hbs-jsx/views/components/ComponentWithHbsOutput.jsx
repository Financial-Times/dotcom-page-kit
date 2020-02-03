import React from 'react'

export default function ComponentWithHbsOutput(props) {
  function createMarkup(markup) {
    return { __html: markup }
  }

  return (
    <div className="jsx-component-with-hbs-output" style={{ backgroundColor: '#F2DFCE', padding: '20px' }}>
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={createMarkup(props.handlebarsOutput)} />
      <p>The above Handlebars output was passed to this JSX component</p>
    </div>
  )
}
