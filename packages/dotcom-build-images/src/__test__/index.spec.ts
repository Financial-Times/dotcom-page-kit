import { promisify } from 'util'
import webpack, { Configuration as WebpackConfiguration } from 'webpack'
import path from 'path'
import { PageKitImagesPlugin } from '../index'

describe('dotcom-build-images', () => {
  const webpackAsync = promisify(webpack)
  it('build images', async () => {
    const webpackConfig: WebpackConfiguration = {
      mode: 'none',
      entry: {
        // adding an example entry as webpack 4 doesnt support an empty object
        scripts: path.join(__dirname, '/__fixtures__', 'entry-point.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(__dirname, '/tmp')
      },
      plugins: [new PageKitImagesPlugin({ basePath: path.join(__dirname, '/__fixtures__', '/images') })]
    }
    const result = await webpackAsync([webpackConfig])
    if (!result) {
      throw new Error('No webpack results')
    }

    const stats = result.stats[0].toJson()

    if (!stats) {
      throw new Error('No stats')
    }

    const files = stats.assets?.map((asset) => asset.name) as string[]

    expect(files.includes('scripts.js')).toBe(true)
    expect(files.includes('__images__.js')).toBe(true)
    expect(files.includes('vectors/square.469177db7c8b.svg')).toBe(true)
  })
})
