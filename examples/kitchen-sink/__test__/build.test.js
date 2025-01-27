const fs = require('fs')

describe('examples/kitchen-sink/build', () => {
  it('creates the expected JS, CSS, and manifest files', () => {
    const output = fs.readdirSync('./public')
    expect(output).toMatchInlineSnapshot(`
      [
        "assets-manifest.json",
        "async.css",
        "financial-times-n-tracking.bundle.js",
        "financial-times-o-footer.bundle.js",
        "financial-times-o-grid.bundle.js",
        "financial-times-o-header.bundle.js",
        "financial-times-o-toggle.bundle.js",
        "financial-times-o-tracking.bundle.js",
        "financial-times-o-typography.bundle.js",
        "financial-times-o-utils.bundle.js",
        "financial-times-o-viewport.bundle.js",
        "page-kit-components.bundle.js",
        "page-kit-layout-styles.css",
        "preact.bundle.js",
        "privacy-components.bundle.js",
        "scripts.bundle.js",
        "shared.stable.bundle.js",
        "styles.css",
        "vendors.bundle.js",
        "vendors.css",
        "webpack-runtime.bundle.js",
      ]
    `)
  })
})
