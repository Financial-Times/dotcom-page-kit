#!/usr/bin/env node

// NOTE: `../dist/node` will be present in the distributed package, so it's absence should not cause lint checks to fail
const { executeCli } = require('../dist/node') // eslint-disable-line import/no-unresolved

executeCli({
  argv: process.argv,
  workingDir: process.cwd()
})
