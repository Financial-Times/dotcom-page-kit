#!/usr/bin/env node

const { createProgram } = require('../dist/cjs') // eslint-disable-line import/no-unresolved
const program = createProgram({ workingDir: process.cwd() })
program.parse(process.argv)
