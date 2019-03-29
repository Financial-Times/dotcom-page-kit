/**
 * This file exports the babel preset so that it can be used in a babelrc as follows:
 * {
 *    "preset": [
 *      "@financial-times/anvil/babel"
 *    ]
 * }
 */

// NOTE: `./dist/cjs/operations/getBabelConfig` will be present in the
// distributed package,so it's absence should not cause lint checks to fail
module.exports = require('./dist/cjs/operations/getBabelConfig') // eslint-disable-line import/no-unresolved
