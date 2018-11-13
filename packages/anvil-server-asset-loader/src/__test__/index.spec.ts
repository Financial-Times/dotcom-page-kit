import AssetLoader from '../'

const testCssFile = 'example.css'
const testJsFile = 'example.js'

const manifest = {
  'example.css': 'example.1234567.css',
  'example.js': 'example.1234567.js'
}

jest.mock('../loadManifest', () => {
  return {
    loadManifest: jest.fn(() => manifest)
  }
})

jest.mock('../loadFile', () => {
  return {
    loadFile: jest.fn(() => {
      return 'some-stringified-asset-data'
    })
  }
})

describe('anvil-server-asset-loader', () => {
  let loader

  beforeEach(() => {
    loader = new AssetLoader({
      manifestPath: 'path/to/manifest',
      publicPath: 'public/path/to/assets',
      internalPath: '/internal/path/to/assets'
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("fetch a file's hashed name from a manifest", () => {
    const assetPath = loader.getHashedAsset(testCssFile)
    expect(assetPath).toEqual('example.1234567.css')
  })

  it("errors if the file can't be found in the manifest", () => {
    expect(() => {
      loader.getHashedAsset('test')
    }).toThrow(Error('Couldn\'t find asset "test" in manifest'))
  })

  it('should create a stylesheet <link> tag', () => {
    expect(loader.createStylesheetLink(testCssFile)).toEqual(
      '<link rel="stylesheet" href="public/path/to/assets/example.1234567.css">'
    )
  })

  it('should create a javascript <link> tag', () => {
    expect(loader.createJavascriptLink(testJsFile)).toEqual(
      '<script src="public/path/to/assets/example.1234567.js"></script>'
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
})
