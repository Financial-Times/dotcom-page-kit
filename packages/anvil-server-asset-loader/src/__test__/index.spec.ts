import AssetLoader from '../'

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
      publicPath: 'public/assets',
      fileSystemPath: '/internal/path/to/assets'
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('.getHashedAsset()', () => {
    it('returns the hashed name from a manifest', () => {
      const result = loader.getHashedAsset('example.css')
      expect(result).toEqual('example.1234567.css')
    })

    it("errors if the file can't be found in the manifest", () => {
      expect(() => {
        loader.getHashedAsset('test')
      }).toThrow(Error('Couldn\'t find asset "test" in manifest'))
    })
  })

  describe('.getFileSystemPath()', () => {
    it('returns the file system path for the requested file', () => {
      const result = loader.getFileSystemPath('example.css')
      expect(result).toEqual('/internal/path/to/assets/example.1234567.css')
    })
  })

  describe('.getPublicPath()', () => {
    it('returns the public path for the requested file', () => {
      const result = loader.getPublicPath('example.css')
      expect(result).toEqual('public/assets/example.1234567.css')
    })
  })

  describe('.getFileContents()', () => {
    it('returns the file contents for the requested file', () => {
      const result = loader.getFileContents('example.css')
      expect(result).toEqual('some-stringified-asset-data')
    })
  })
})
