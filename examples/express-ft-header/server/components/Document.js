const React = require('react')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')
const { Layout } = require('@financial-times/anvil-ui-ft-layout')
const buildService = require('../lib/buildService')

const origamiComponents = ['o-header@^7.7.0', 'o-footer@^6.1.0', 'o-fonts@^3.2.0', 'o-normalise@^1.6.2']

const defaultShellProps = {
  coreScriptsToLoad: [],
  enhancedScriptsToLoad: [buildService(origamiComponents, 'js')],
  stylesheets: [buildService(origamiComponents, 'css')],
  criticalStyles: 'body {background-color:#fff1e5; color:#33302e;}'
}

const defaultLayoutProps = {
  header: 'simple',
  footer: 'simple'
}

function Document({ shellProps, layoutProps, headerProps, footerProps, children } = {}) {
  // TODO: refactor this prop name
  const props = { ...headerProps, ...footerProps }

  return React.createElement(
    Shell,
    { ...defaultShellProps, ...shellProps },
    React.createElement(Layout, { ...defaultLayoutProps, ...layoutProps, props }, children)
  )
}

module.exports = Document
