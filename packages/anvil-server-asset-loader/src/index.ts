import path from 'path'
import { loadFile } from './helpers/loadFile'
import { loadManifest } from './helpers/loadManifest'

interface AssetLoaderOptions {
  /** The name of the manifest file which will be resolved from the given fileSystemPath */
  manifestFileName: string
  /** The base URL for assets (as seen by users) */
  publicPath: string
  /** An absolute path to the assets folder on disk */
  fileSystemPath: string
  /** Store file contents in memory when accessed */
  cacheFileContents: boolean
}

const defaultOptions: AssetLoaderOptions = {
  manifestFileName: 'manifest.json',
  publicPath: '/public',
  fileSystemPath: path.resolve('./public'),
  cacheFileContents: false
}

class AssetLoader {
  public options: AssetLoaderOptions
  public manifest: object

  constructor(userOptions: Partial<AssetLoaderOptions>) {
    this.options = { ...defaultOptions, ...userOptions }
    this.manifest = loadManifest(path.resolve(this.options.fileSystemPath, this.options.manifestFileName))
  }

  getHashedAsset(asset: string): string {
    if (this.manifest.hasOwnProperty(asset)) {
      return this.manifest[asset]
    } else {
      throw Error(`Couldn't find asset "${asset}" in manifest`)
    }
  }

  findAssets(pattern: string | RegExp): string[] {
    return Object.keys(this.manifest).reduce((matches: string[], key: string) => {
      if (typeof pattern === 'string' && key.includes(pattern)) {
        matches.push(key)
      }

      if (pattern instanceof RegExp && pattern.test(key)) {
        matches.push(key)
      }

      return matches
    }, [])
  }

  findHashedAssets(pattern: string | RegExp): string[] {
    return this.findAssets(pattern).map((asset) => this.getHashedAsset(asset))
  }

  getFileContents(asset: string): string {
    return loadFile(this.getFileSystemPath(asset), this.options.cacheFileContents)
  }

  getFileSystemPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    return path.join(this.options.fileSystemPath, hashedAsset)
  }

  getPublicPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    // Do not use path.join() as separator is platform specific
    return `${this.options.publicPath}/${hashedAsset}`
  }

  getStylesheetInline(stylesheet: string): string {
    return `<style>${this.getFileContents(stylesheet)}</style>`
  }

  getJavascriptInline(javascript: string): string {
    return `<script>${this.getFileContents(javascript)}</script>`
  }

  createStylesheetLink(stylesheet: string): string {
    return `<link rel="stylesheet" href="${this.getPublicPath(stylesheet)}">`
  }

  createJavascriptLink(javascript: string): string {
    return `<script src="${this.getPublicPath(javascript)}"></script>`
  }
}

export default AssetLoader
