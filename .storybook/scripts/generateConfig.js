/*
  This script is used to generate the `config.js` file that storybook uses
  to load stories. See `../readme.md` to find out why the config file needs to
  be generated
*/

const fs = require('fs')
const path = require('path')
const glob = require('glob')

generatePathsConfig(process.cwd())

function generatePathsConfig(cwd) {
  const paths = getPaths(cwd)
  const configFilePath = path.join(__dirname, '../config.js')
  const configFileContents = prepareConfigFileContents(paths)
  fs.writeFileSync(configFilePath, configFileContents)
}

function getPaths(cwd) {
  return glob.sync('packages/dotcom-ui-*/src/**/*story.tsx', { cwd }).map((p) => path.join('../', p))
}

function prepareConfigFileContents(paths) {
  const storiesContents = paths.map((p) => `require('${p}')`).join('\n\t')
  const configFileTemplatePath = path.join(__dirname, '../config.template.js')
  return fs
    .readFileSync(configFileTemplatePath)
    .toString()
    .replace('//__PLACEHOLDER:STORIES__//', storiesContents)
    .replace('//__PLACEHOLDER:NOTE__//', commentNotifyingOfGeneration())
}

function commentNotifyingOfGeneration() {
  return `/*
  NOTE: This file is auto generated so don't add anything to it.
  Make your changes to ./config.template.js instead.
*/`
}
