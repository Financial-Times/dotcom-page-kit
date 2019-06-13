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

  it('creates a JS bundle for Anvil UI components', () => {
    expect(output).toContain('anvil-ui.bundle.js')
  })

  it('creates a shared JS bundle', () => {
    expect(output).toContain('shared.stable.bundle.js')
  })

  it('creates bundles for Webpack and Babel runtime helpers', () => {
    expect(output).toContain('webpack-runtime.bundle.js')
    expect(output).toContain('babel-runtime.bundle.js')
  })

  it('creates an app JS bundle', () => {
    expect(output).toContain('scripts.bundle.js')
  })

  it('creates an app CSS bundle', () => {
    expect(output).toContain('styles.css')
  })

  it('creates a manifest file', () => {
    expect(output).toContain('manifest.json')
  })
})
