import React from 'react'

export default function ComponentWithHbsPartial(props) {
  function createMarkup(markup) {
    return { __html: markup }
  }

  return (
    <div className="jsx-component-with-hbs-partial" style={{ backgroundColor: '#F2DFCE', padding: '20px' }}>
      <h1>This is a JSX component</h1>
      <div dangerouslySetInnerHTML={createMarkup(props.handlebarsPartial)} />
      <p>The output of the above Handlebars partial was passed to this JSX component</p>
    </div>
  )
}
