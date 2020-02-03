import fs from 'fs'
import Handlebars from 'handlebars'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Component from './components/Component'

const fileContent = fs.readFileSync(
  path.join(__dirname, './partials/partial-template-with-jsx-output.hbs'),
  'utf8'
)

const handlebarsPartialTemplate = Handlebars.compile(fileContent)

export default function Home({ pageTitle }) {
  function createMarkup(markup) {
    return { __html: markup }
  }

  const myAssignedOutput = <Component title="This is JSX output" />

  return (
    <div style={{ backgroundColor: '#FFF1EF', padding: '20px' }}>
      <h1>{pageTitle}</h1>
      <p>This page has been rendered using JSX as the view engine</p>

      <div
        dangerouslySetInnerHTML={createMarkup(
          handlebarsPartialTemplate({
            title: 'This is Handlebars output',
            jsxOutput: ReactDOMServer.renderToString(myAssignedOutput)
          })
        )}
      />
      <p>
        The above Handlebars partial template was imported from a local route and output via React’s
        dangerouslySetInnerHTML prop
      </p>
    </div>
  )
}
