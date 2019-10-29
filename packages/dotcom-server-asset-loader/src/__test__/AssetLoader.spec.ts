import { AssetLoader, AssetLoaderOptions } from '../AssetLoader'
import manifest from './__fixtures__/manifest.json'

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

function createAssetLoader(options?: AssetLoaderOptions) {
  return new AssetLoader(options)
}

describe('dotcom-server-asset-loader/src/AssetLoader', () => {
  let loader

  beforeEach(() => {
    loader = createAssetLoader({
      publicPath: '/public/assets/',
      fileSystemPath: '/internal/path/to/assets'
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('constructor', () => {
    it('uses the supplied manifest instead of looking it up', () => {
      const manifest = { foo: 'bar' }
      const loader = createAssetLoader({ manifest })
      const result = loader.getHashedAsset('foo')
      expect(result).toBe(manifest.foo)
    })
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
      expect(a).toEqual(['main.js'])

      const b = loader.matchAssets('main')
      expect(b).toEqual(['main.js'])

      const c = loader.matchAssets((filename) => filename === 'main.js')
      expect(c).toEqual(['main.js'])
    })
  })

  describe('.getHashedAssetsMatching(pattern)', () => {
    it('returns an array of matching hashed file names from the manifest', () => {
      const a = loader.getHashedAssetsMatching(/main/)
      expect(a).toEqual(['main.12345.bundle.js'])

      const b = loader.getHashedAssetsMatching('main')
      expect(b).toEqual(['main.12345.bundle.js'])

      const c = loader.getHashedAssetsMatching((filename) => filename === 'main.js')
      expect(c).toEqual(['main.12345.bundle.js'])
    })
  })

  describe('getPublicURLOfHashedAssetsMatching(pattern', () => {
    it('returns the public urls of hashed assets whose entry file name matches the supplied pattern', () => {
      const a = loader.getPublicURLOfHashedAssetsMatching(/main/)
      expect(a).toEqual(['/public/assets/main.12345.bundle.js'])

      const b = loader.getPublicURLOfHashedAssetsMatching('main')
      expect(b).toEqual(['/public/assets/main.12345.bundle.js'])

      const c = loader.getPublicURLOfHashedAssetsMatching((filename) => filename === 'main.js')
      expect(c).toEqual(['/public/assets/main.12345.bundle.js'])
    })
  })

  describe('.getFileSystemPath()', () => {
    it('returns the file system path for the requested file', () => {
      const result = loader.getFileSystemPath('styles.css')
      expect(result).toEqual('/internal/path/to/assets/styles.12345.bundle.css')
    })
  })

  describe('.getPublicURL()', () => {
    const tests = [
      { expected: '/styles.12345.bundle.css' },
      { publicPath: '', expected: 'styles.12345.bundle.css' },
      { publicPath: '/', expected: '/styles.12345.bundle.css' },
      { publicPath: '/lib', expected: '/lib/styles.12345.bundle.css' },
      { publicPath: '/lib/', expected: '/lib/styles.12345.bundle.css' },
      { publicPath: '../', expected: '../styles.12345.bundle.css' }
    ]

    tests.forEach(({ publicPath, expected }) => {
      it(`publicPath: ${publicPath}`, () => {
        const loader = typeof publicPath === 'undefined' ? new AssetLoader() : new AssetLoader({ publicPath })
        const result = loader.getPublicURL('styles.css')
        expect(result).toEqual(expected)
      })
    })
  })

  describe('.getFileContents()', () => {
    it('returns the file contents for the requested file', () => {
      const result = loader.getFileContents('styles.css')
      expect(result).toEqual('FILE CONTENTS')
    })
  })

  describe('.getFilesFor()', () => {
    it('returns all file types', () => {
      const result = loader.getFilesFor('main')

      expect(Object.keys(result)).toEqual(['js', 'css'])
      expect(result.js).toEqual(expect.any(Array))
      expect(result.css).toEqual(expect.any(Array))
    })

    it('throws if the entry point cannot be found', () => {
      expect(() => loader.getFilesFor('third')).toThrow()
    })
  })

  describe('.getScriptFilesFor()', () => {
    it('returns an array', () => {
      const result = loader.getScriptFilesFor('main')
      expect(result).toEqual(expect.any(Array))
    })

    it('returns an array of JS files', () => {
      const result = loader.getScriptFilesFor('main')

      expect(result.length).toBe(3)

      result.forEach((item) => {
        expect(item).toMatch(/\.js$/)
      })
    })
  })

  describe('.getStylesheetFilesFor()', () => {
    it('returns an array of CSS files', () => {
      const result = loader.getStylesheetFilesFor('main')

      expect(result.length).toBe(2)

      result.forEach((item) => {
        expect(item).toMatch(/\.css$/)
      })
    })
  })

  describe('.getScriptPathsFor()', () => {
    it('returns an array of JS file paths', () => {
      const result = loader.getScriptPathsFor('main')

      expect(result.length).toBe(3)

      result.forEach((item) => {
        expect(item).toMatch(/^\/internal\/path\/to\/assets\/.+\.js$/)
      })
    })
  })

  describe('.getStylesheetPathsFor()', () => {
    it('returns an array of CSS file paths', () => {
      const result = loader.getStylesheetPathsFor('main')

      expect(result.length).toBe(2)

      result.forEach((item) => {
        expect(item).toMatch(/^\/internal\/path\/to\/assets\/.+\.css$/)
      })
    })
  })

  describe('.getScriptURLsFor()', () => {
    it('returns an array of JS file URLs', () => {
      const result = loader.getScriptURLsFor('main')

      expect(result.length).toBe(3)

      result.forEach((item) => {
        expect(item).toMatch(/^\/public\/assets\/.+\.js$/)
      })
    })
  })

  describe('.getStylesheetURLsFor()', () => {
    it('returns an array of CSS file URLs', () => {
      const result = loader.getStylesheetURLsFor('main')

      expect(result.length).toBe(2)

      result.forEach((item) => {
        expect(item).toMatch(/^\/public\/assets\/.+\.css$/)
      })
    })
  })
})
