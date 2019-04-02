#!/usr/bin/env node
'use strict'

const meow = require('meow')
const UpdateDep = require('./UpdateDep')

const cli = meow({
  description:
    'This script upgrades a particular production, dev and peer dependency to the latest version across the entire anvil repo.',
  help: `
    Usage
      $ node update-dep <packageName>
    Examples
      $ node update-dep react
`
})

const dependencyName = cli.input[0]

if (!dependencyName) {
  cli.showHelp() // This method will automatically exit
}

const script = new UpdateDep({ dependencyName })
script.execute()
