import AssetLoader from '../'

const testCssFile = 'example.css'
const testJsFile = 'example.js'
const manifest = {
  'example.css': 'public/example.1234567.css',
  'example.js': 'public/example.1234567.js'
}

jest.mock('../asset-helpers', () => {
  return {
    loadManifest: jest.fn(() => manifest)
  }
})

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn(() => {
      return 'some-stringified-asset-data'
    })
  }
})

describe('asset-loader', () => {
  let loader
  beforeEach(() => {
    loader = new AssetLoader('path/to/manifest')
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create a stylesheet <link> tag', () => {
    expect(loader.createStylesheetLink(testCssFile)).toEqual(
      '<link rel="stylesheet" href="/public/example.1234567.css">'
    )
  })
  it('should create a javascript <link> tag', () => {
    expect(loader.createJavascriptLink(testJsFile)).toEqual(
      '<script rel="text/javascript" src="/public/example.1234567.js"></script>'
    )
  })
  it('should create a stylesheet <style> tag', () => {
    const styles = loader.getStylesheetInline(testCssFile)
    expect(styles).toEqual('<style>some-stringified-asset-data</style>')
  })
  it('should create a javascript <script> tag', () => {
    const styles = loader.getJavascriptInline(testJsFile)
    expect(styles).toEqual('<script>some-stringified-asset-data</script>')
  })
  it("should fetch a file's location from a manifest", () => {
    const assetPath = loader.getAssetPath(testCssFile)
    expect(assetPath).toEqual('public/example.1234567.css')
  })
  it("should error if the file can't be found in a manifest", () => {
    expect(() => {
      loader.getAssetPath('test')
    }).toThrow(Error('Couldn\'t find asset "test" in manifest'))
  })
})
