const fs = require('fs')

describe('examples/kitchen-sink/build', () => {
  let output

  beforeAll(() => {
    output = fs.readdirSync('./public')
  })

  it('creates a JS bundle for each Origami component', () => {
    expect(output).toContain('o-header.bundle.js')
    expect(output).toContain('o-footer.bundle.js')
    expect(output).toContain('o-utils.bundle.js')
    expect(output).toContain('o-viewport.bundle.js')
  })

  it('creates a JS bundle for Page Kit UI components', () => {
    expect(output).toContain('page-kit-components.bundle.js')
  })

  it('creates a shared JS bundle', () => {
    expect(output).toContain('shared.stable.bundle.js')
  })

  it('creates bundles for Webpack runtime', () => {
    expect(output).toContain('webpack-runtime.bundle.js')
  })

  it('creates an app JS bundle', () => {
    expect(output).toContain('scripts.bundle.js')
  })

  it('creates an app CSS bundle', () => {
    expect(output).toContain('styles.css')
  })

  it('creates an app async CSS bundle', () => {
    expect(output).toContain('async.css')
  })

  it('creates a global layout CSS bundle', () => {
    expect(output).toContain('page-kit-layout-styles.css')
  })

  it('creates a manifest file', () => {
    expect(output).toContain('manifest.json')
  })
})
