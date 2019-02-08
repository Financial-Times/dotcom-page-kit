/**
 * This file exports the babel preset so that it can be used in a .babelrc file as follows:
 * {
 *    "preset": [
 *      "@financial-times/anvil-plugin-esnext/babel"
 *    ]
 * }
 *
 */

module.exports = require('./dist/cjs/babel') // eslint-disable-line import/no-unresolved
