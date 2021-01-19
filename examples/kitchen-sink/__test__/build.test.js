const fs = require('fs')

const expected = [
  'async.css',
  'financial-times-n-ads.bundle.js',
  'financial-times-n-tracking.bundle.js',
  'financial-times-o-ads.bundle.js',
  'financial-times-o-grid.bundle.js',
  'financial-times-o-tracking.bundle.js',
  'financial-times-o-utils.bundle.js',
  'financial-times-o-viewport.bundle.js',
  'manifest.json',
  'n-topic-search.bundle.js',
  'n-ui-foundations.bundle.js',
  'o-footer.bundle.js',
  'o-grid.bundle.js',
  'o-header.bundle.js',
  'o-toggle.bundle.js',
  'o-typography.bundle.js',
  'o-utils.bundle.js',
  'o-viewport.bundle.js',
  'page-kit-components.bundle.js',
  'page-kit-layout-styles.css',
  'regenerator-runtime.bundle.js',
  'scripts.bundle.js',
  'shared.stable.bundle.js',
  'styles.css',
  'webpack-runtime.bundle.js'
]

describe('examples/kitchen-sink/build', () => {
  let output

  beforeAll(() => {
    output = fs.readdirSync('./public')
  })

  it('creates the expected JS, CSS, and manifest files', () => {
    expect(output.sort()).toEqual(expected)
  })
})
