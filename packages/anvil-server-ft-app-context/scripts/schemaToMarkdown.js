const parse = require('json-schema-to-markdown')
const schema = require('../src/schema.json')

console.log(parse(schema)) // eslint-disable-line no-console
