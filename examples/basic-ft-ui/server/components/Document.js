const React = require('react')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')
const { Layout } = require('@financial-times/anvil-ui-ft-layout')

const scripts = ['/dist/client.bundle.js']

const styles = ['/dist/styles.css']

const shellProps = {
  coreScripts: [],
  enhancedScripts: scripts,
  stylesheets: styles,
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
