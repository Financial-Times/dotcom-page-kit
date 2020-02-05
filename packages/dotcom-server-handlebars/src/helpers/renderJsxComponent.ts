import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default function renderJsxComponent({ hash }) {
  let modulePath

  if (hash.hasOwnProperty('package')) {
    modulePath = path.resolve(`node_modules/${hash.package}`)
  }

  // localRoute is relative to root of app consuming dotcom-server-handlebars.
  if (hash.hasOwnProperty('localRoute')) {
    modulePath = path.resolve(hash.localRoute)
  }

  if (!modulePath) {
    throw new Error('You must specify a "package" or "localRoute" argument to load a module')
  }

  const importedModule = require(modulePath)

  const Component = hash.hasOwnProperty('namedExport')
    ? importedModule[hash.namedExport]
    : importedModule.default

  const props = { ...this, ...hash }

  if (props.hasOwnProperty('_locals')) {
    throw new Error(
      `The root handlebars context shouldn't be passed to a component, as it may contain sensitive data.`
    )
  }

  return ReactDOMServer.renderToString(React.createElement(Component, props))
}
