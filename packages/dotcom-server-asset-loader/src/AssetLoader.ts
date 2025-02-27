import path from 'path'
import urlJoin from 'url-join'
import { loadFile } from './helpers/loadFile'
import { loadManifest } from './helpers/loadManifest'

export interface AssetLoaderOptions {
  /**
   * The name of the asset manifest file
   * @default "assets-manifest.json"
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
  manifestFileName: 'assets-manifest.json',
  fileSystemPath: path.resolve('./public'),
  cacheFileContents: false
}

type TEntrypoint = {
  [type: string]: string[]
}

type TEntrypoints = {
  entrypoints?: {
    [name: string]: {
      assets: TEntrypoint
    }
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

  //
  // File name prefix methods
  //

  formatPublicURL(hashedAsset: string): string {
    return urlJoin(this.options.publicPath, hashedAsset)
  }

  formatFileSystemPath(hashedAsset: string): string {
    return path.join(this.options.fileSystemPath, hashedAsset)
  }

  //
  // Webpack entry point methods
  //

  getFilesFor(entrypoint: string): TEntrypoint {
    if (this.manifest.entrypoints && this.manifest.entrypoints[entrypoint]) {
      return this.manifest.entrypoints[entrypoint].assets
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
