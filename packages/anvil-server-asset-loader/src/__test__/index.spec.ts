import AssetLoader from '../'

const manifest = {
  'styles.css': 'styles.12345.bundle.css',
  'main.js': 'main.12345.bundle.js',
  'secondary.js': 'secondary.12345.bundle.js',
  'vendor~main~secondary.js': 'vendor~main~secondary.12345.bundle.js'
}

jest.mock('../helpers/loadManifest', () => {
  return {
    loadManifest: jest.fn(() => manifest)
  }
})

jest.mock('../helpers/loadFile', () => {
  return {
    loadFile: jest.fn(() => {
      return 'FILE CONTENTS'
    })
  }
})

describe('anvil-server-asset-loader', () => {
  let loader

  beforeEach(() => {
    loader = new AssetLoader({
      publicPath: 'public/assets',
      fileSystemPath: '/internal/path/to/assets'
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('.getHashedAsset()', () => {
    it('returns the hashed name from a manifest', () => {
      const result = loader.getHashedAsset('styles.css')
      expect(result).toEqual('styles.12345.bundle.css')
    })

    it("errors if the file can't be found in the manifest", () => {
      expect(() => {
        loader.getHashedAsset('test')
      }).toThrow(Error('Couldn\'t find asset "test" in manifest'))
    })
  })

  describe('.findAssets()', () => {
    it('returns an array of matching file names from the manifest', () => {
      const a = loader.findAssets(/main/)
      expect(a).toEqual(['main.js', 'vendor~main~secondary.js'])

      const b = loader.findAssets('main')
      expect(b).toEqual(['main.js', 'vendor~main~secondary.js'])
    })
  })

  describe('.findHashedAssets()', () => {
    it('returns an array of matching hashed file names from the manifest', () => {
      const a = loader.findHashedAssets(/main/)
      expect(a).toEqual(['main.12345.bundle.js', 'vendor~main~secondary.12345.bundle.js'])

      const b = loader.findHashedAssets('main')
      expect(b).toEqual(['main.12345.bundle.js', 'vendor~main~secondary.12345.bundle.js'])
    })
  })

  describe('.getFileSystemPath()', () => {
    it('returns the file system path for the requested file', () => {
      const result = loader.getFileSystemPath('styles.css')
      expect(result).toEqual('/internal/path/to/assets/styles.12345.bundle.css')
    })
  })

  describe('.getPublicPath()', () => {
    it('returns the public path for the requested file', () => {
      const result = loader.getPublicPath('styles.css')
      expect(result).toEqual('public/assets/styles.12345.bundle.css')
    })
  })

  describe('.getFileContents()', () => {
    it('returns the file contents for the requested file', () => {
      const result = loader.getFileContents('styles.css')
      expect(result).toEqual('FILE CONTENTS')
    })
  })
})
