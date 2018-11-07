#!/usr/bin/env node

// NOTE: `../dist/cjs` will only be present in the distributed package
const { createProgram } = require('../dist/cjs') // eslint-disable-line import/no-unresolved
const program = createProgram({ workingDir: process.cwd() })
program.parse(process.argv)
