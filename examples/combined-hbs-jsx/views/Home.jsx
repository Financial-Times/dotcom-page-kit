import fs from 'fs'
import Handlebars from 'handlebars'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Component from './components/Component'

const fileContent = fs.readFileSync(path.join(__dirname, './partials/partial-with-jsx-component.hbs'), 'utf8')

export default function Home({ pageTitle }) {
  function createMarkup(markup) {
    return { __html: markup }
  }

  const template = Handlebars.compile(fileContent)

  const myAssignedComponent = <Component title="This is a JSX component" />

  return (
    <div style={{ backgroundColor: '#FFF1EF', padding: '20px' }}>
      <h1>{pageTitle}</h1>
      <p>This page has been rendered using JSX as the view engine</p>

      <div
        dangerouslySetInnerHTML={createMarkup(
          template({ jsxComponent: ReactDOMServer.renderToString(myAssignedComponent) })
        )}
      />
    </div>
  )
}
