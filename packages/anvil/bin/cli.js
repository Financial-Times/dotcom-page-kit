#!/usr/bin/env node

// NOTE: `../dist/cjs` will be present in the distributed package, so it's absence should not cause lint checks to fail
const { createProgram } = require('../dist/cjs') // eslint-disable-line import/no-unresolved
const program = createProgram({ workingDir: process.cwd() })
program.parse(process.argv)
