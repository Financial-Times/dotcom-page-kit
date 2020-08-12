import { PageKitCodeSplittingPlugin } from '../index'
import webpack from 'webpack'
import path from 'path'

describe('Code Splitting', () => {
  it('chunk privacy modules', async () => {
    await new Promise((resolve) =>
      webpack(
        {
          mode: 'none',
          entry: {
            scripts: path.join(__dirname, '/__fixtures__', 'entry-point.js')
          },
          output: {
            filename: '[name].js',
            path: path.join(__dirname, '/tmp')
          },
          plugins: [new PageKitCodeSplittingPlugin()]
        },
        function (err, stats) {
          if (err) {
            throw err
          } else if (stats.hasErrors()) {
            throw stats.toString()
          }

          const files = stats.toJson().assets.map(asset => asset.name)

          expect(files).toEqual(expect.arrayContaining(['privacy-components.js']))

          resolve()
        }
      )
    )
  })
})
