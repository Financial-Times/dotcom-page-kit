const React = require('react')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')
const { Layout } = require('@financial-times/anvil-ui-ft-layout')
const buildService = require('../lib/buildService')

const origamiComponents = ['o-header@^7.7.0', 'o-footer@^6.1.0', 'o-fonts@^3.2.0', 'o-normalise@^1.6.2']

const shellProps = {
  coreScriptsToLoad: [],
  enhancedScriptsToLoad: [buildService.js(origamiComponents)],
  stylesheets: [buildService.css(origamiComponents)],
  criticalStyles: 'body {background-color:#fff1e5; color:#33302e;}'
}

const layoutProps = {
  header: 'simple',
  footer: 'simple'
}

function Document({ navigationData, children }) {
  return React.createElement(
    Shell,
    shellProps,
    React.createElement(Layout, { ...layoutProps, props: { data: navigationData } }, children)
  )
}

module.exports = Document
