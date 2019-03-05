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

function createAssetLoader({
  publicPath = 'public/assets',
  fileSystemPath = '/internal/path/to/assets',
  ...otherOptions
} = {}) {
  return new AssetLoader({ publicPath, fileSystemPath, ...otherOptions })
}

describe('anvil-server-asset-loader', () => {
  let loader

  beforeEach(() => {
    loader = createAssetLoader()
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

  describe('.matchAssets()', () => {
    it('returns an array of matching file names from the manifest', () => {
      const a = loader.matchAssets(/main/)
      expect(a).toEqual(['main.js', 'vendor~main~secondary.js'])

      const b = loader.matchAssets('main')
      expect(b).toEqual(['main.js', 'vendor~main~secondary.js'])

      const c = loader.matchAssets((filename) => filename === 'main.js')
      expect(c).toEqual(['main.js'])
    })
  })

  describe('.getFileSystemPath()', () => {
    it('returns the file system path for the requested file', () => {
      const result = loader.getFileSystemPath('styles.css')
      expect(result).toEqual('/internal/path/to/assets/styles.12345.bundle.css')
    })
  })

  describe('.getPublicURL()', () => {
    it('returns the public path for the requested file', () => {
      const result = loader.getPublicURL('styles.css')
      expect(result).toEqual('public/assets/styles.12345.bundle.css')
    })

    it('should correctly format the url when the public path has not been set', () => {
      const loader = createAssetLoader({ publicPath: '' })
      const result = loader.getPublicURL('styles.css')
      expect(result).toEqual('styles.12345.bundle.css')
    })
  })

  describe('.getFileContents()', () => {
    it('returns the file contents for the requested file', () => {
      const result = loader.getFileContents('styles.css')
      expect(result).toEqual('FILE CONTENTS')
    })
  })
})
