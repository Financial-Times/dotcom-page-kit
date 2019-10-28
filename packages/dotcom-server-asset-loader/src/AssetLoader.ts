import path from 'path'
import { loadFile } from './helpers/loadFile'
import { loadManifest } from './helpers/loadManifest'

export interface AssetLoaderOptions {
  /**
   * The name of the asset manifest file
   * @default "manifest.json"
   */
  manifestFileName?: string

  /**
   * The public-facing URL for the static assets
   */
  publicPath?: string

  /**
   * The absolute path to the directory of static assets
   * @default path.resolve('./public')
   */
  fileSystemPath?: string

  /**
   * Store files in memory when accessed
   * @default false
   */
  cacheFileContents?: boolean

  /**
   * The asset manifest
   */
  manifest?: { [asset: string]: string }
}

const defaultOptions: AssetLoaderOptions = {
  publicPath: '/',
  manifestFileName: 'manifest.json',
  fileSystemPath: path.resolve('./public'),
  cacheFileContents: false
}

type TEntrypoint = {
  [type: string]: string[]
}

type TEntrypoints = {
  entrypoints?: {
    [name: string]: TEntrypoint
  }
}

type TFiles = {
  [name: string]: string
}

export type TManifest = TEntrypoints & TFiles

export class AssetLoader {
  public options: AssetLoaderOptions
  public manifest: TManifest

  constructor(userOptions?: AssetLoaderOptions) {
    this.options = { ...defaultOptions, ...userOptions }
    this.manifest =
      this.options.manifest ||
      loadManifest(path.resolve(this.options.fileSystemPath, this.options.manifestFileName))
  }

  matchAssets(pattern: string | RegExp | Function): string[] {
    return Object.keys(this.manifest).reduce((matches: string[], key: string) => {
      if (typeof pattern === 'string' && key.includes(pattern)) {
        matches.push(key)
      }

      if (pattern instanceof RegExp && pattern.test(key)) {
        matches.push(key)
      }

      if (pattern instanceof Function && pattern(key)) {
        matches.push(key)
      }

      return matches
    }, [])
  }

  getHashedAssetsMatching(pattern: string | RegExp | Function): string[] {
    return this.matchAssets(pattern).map((asset) => this.getHashedAsset(asset))
  }

  getHashedAsset(asset: string): string {
    if (this.manifest.hasOwnProperty(asset)) {
      return this.manifest[asset]
    } else {
      throw Error(`Couldn't find asset "${asset}" in manifest`)
    }
  }

  getFileContents(asset: string): string {
    return loadFile(this.getFileSystemPath(asset), this.options.cacheFileContents)
  }

  getFileSystemPath(asset: string): string {
    return this.formatFileSystemPath(this.getHashedAsset(asset))
  }

  getPublicURL(asset: string): string {
    return this.formatPublicURL(this.getHashedAsset(asset))
  }

  getPublicURLOfHashedAssetsMatching(pattern: string | RegExp | Function): string[] {
    return this.matchAssets(pattern).map((asset) => this.getPublicURL(asset))
  }

  //
  // File name prefix methods
  //

  formatPublicURL(hashedAsset: string): string {
    return path.posix.join(this.options.publicPath, hashedAsset)
  }

  formatFileSystemPath(hashedAsset: string): string {
    return path.join(this.options.fileSystemPath, hashedAsset)
  }

  //
  // Webpack entry point methods
  //

  getFilesFor(entrypoint: string): TEntrypoint {
    if (this.manifest.entrypoints && this.manifest.entrypoints[entrypoint]) {
      return this.manifest.entrypoints[entrypoint]
    } else {
      throw Error(`Couldn't find entrypoint "${entrypoint}" in manifest`)
    }
  }

  getScriptFilesFor(entrypoint: string): string[] {
    return this.getFilesFor(entrypoint).js || []
  }

  getStylesheetFilesFor(entrypoint: string): string[] {
    return this.getFilesFor(entrypoint).css || []
  }

  getScriptPathsFor(entrypoint: string): string[] {
    return this.getScriptFilesFor(entrypoint).map(this.formatFileSystemPath.bind(this))
  }

  getStylesheetPathsFor(entrypoint: string): string[] {
    return this.getStylesheetFilesFor(entrypoint).map(this.formatFileSystemPath.bind(this))
  }

  getScriptURLsFor(entrypoint: string): string[] {
    return this.getScriptFilesFor(entrypoint).map(this.formatPublicURL.bind(this))
  }

  getStylesheetURLsFor(entrypoint: string): string[] {
    return this.getStylesheetFilesFor(entrypoint).map(this.formatPublicURL.bind(this))
  }
}
