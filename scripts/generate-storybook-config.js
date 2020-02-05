/**
 This script generates the configuration file for Storybook. It dynamically
 finds stories defined by packages in the repository.

 Usage: node generate-storybook-config.js
*/

const fs = require('fs')
const path = require('path')
const glob = require('glob')

const OUTPUT_FILE = path.resolve('.storybook/config.js')
const TEMPLATE_FILE = path.resolve('.storybook/config.template.js')

generateConfig()

function generateConfig() {
  const paths = getPaths()
  const configFileContents = prepareConfigFileContents(paths)
  fs.writeFileSync(OUTPUT_FILE, configFileContents)
}

function getPaths() {
  return glob.sync('packages/dotcom-ui-*/src/**/story.tsx').map((p) => path.join('../', p))
}

function prepareConfigFileContents(paths) {
  const storiesContents = paths.map((p) => `require('${p}')`).join('\n\t')

  return fs.readFileSync(TEMPLATE_FILE, { encoding: 'utf8' }).replace('/* PLACEHOLDER */', storiesContents)
}
