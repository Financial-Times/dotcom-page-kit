const fs = require('fs')

describe('examples/kitchen-sink/build', () => {
  it('creates the expected JS, CSS, and manifest files', () => {
    const output = fs.readdirSync('./public')

    // CSS
    expect(output.includes('styles.css')).toBeTruthy()
    expect(output.includes('async.css')).toBeTruthy()
    expect(output.includes('page-kit-layout-styles.css')).toBeTruthy()

    // Manifest
    expect(output.includes('manifest.json')).toBeTruthy()

    // JS
    expect(output.includes('financial-times-n-tracking.bundle.js')).toBeTruthy()
    expect(output.includes('financial-times-o-grid.bundle.js')).toBeTruthy()
    expect(output.includes('financial-times-o-toggle.bundle.js')).toBeTruthy()
    expect(output.includes('financial-times-o-tracking.bundle.js')).toBeTruthy()
    expect(output.includes('financial-times-o-utils.bundle.js')).toBeTruthy()
    expect(output.includes('financial-times-o-viewport.bundle.js')).toBeTruthy()
    expect(output.includes('page-kit-components.bundle.js')).toBeTruthy()
    expect(output.includes('scripts.bundle.js')).toBeTruthy()
    expect(output.includes('shared.stable.bundle.js')).toBeTruthy()    
    expect(output.includes('webpack-runtime.bundle.js')).toBeTruthy()
  })
})
