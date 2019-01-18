#!/usr/bin/env node

// NOTE: `../dist/cjs` will be present in the distributed package, so it's absence should not cause lint checks to fail
const { executeCli } = require('../dist/cjs') // eslint-disable-line import/no-unresolved

executeCli({
  argv: process.argv,
  workingDir: process.cwd()
})
