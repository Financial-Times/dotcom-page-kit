import { promisify } from 'util'
import webpack, { Configuration as WebpackConfiguration, Stats } from 'webpack'
import path from 'path'
import { PageKitCodeSplittingPlugin } from '../index'

describe('dotcom-build-code-splitting', () => {
  const webpackAsync = promisify(webpack)
  it('create chunk for privacy modules', async () => {
    const webpackConfig: WebpackConfiguration = {
      mode: 'none',
      entry: {
        scripts: path.join(__dirname, '/__fixtures__', 'entry-point.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(__dirname, '/tmp')
      },
      plugins: [new PageKitCodeSplittingPlugin()]
    }
    const result = (await webpackAsync([webpackConfig])) as { stats: [Stats] }

    const stats = result.stats[0].toJson()
    if (!stats) {
      throw new Error('No stats')
    }
    const files = stats.assets?.map((asset) => asset.name) as string[]

    expect(files.find((file) => file.includes('privacy-components'))).toBeTruthy()
  })
})
