import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default function renderReactComponent({ hash }) {
  let modulePath

  if (hash.hasOwnProperty('package')) {
    // `paths` argument provided to ensure package lookup is made
    // within context of consuming app rather than dependency.
    modulePath = require.resolve(hash.package, { paths: [process.cwd()] })
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
    : importedModule.__esModule
    ? importedModule.default
    : importedModule

  const props = { ...this, ...hash }

  return ReactDOMServer.renderToString(React.createElement(Component, props))
}
