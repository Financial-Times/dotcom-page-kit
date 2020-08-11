import { PageKitCodeSplittingPlugin } from '../index'
import webpack from 'webpack'
import path from 'path'

describe('Code Splitting', () => {
  it('chunk privacy modules', (done) => {
    webpack(
      {
        entry: {
          scripts: path.join(__dirname, '__fixtures__', 'entry-point.js')
        },
        output: {
          filename: '[name].js',
          path: path.join(__dirname, '/tmp')
        },
        plugins: [new PageKitCodeSplittingPlugin()]
      },
      function (err, stats) {
        if (err) {
          return done(err)
        } else if (stats.hasErrors()) {
          return done(stats.toString())
        }

        const files = stats.toJson().assets.map((x) => x.name)

        expect(files).toEqual(expect.arrayContaining(['privacy-components.js']));

        done()
      }
    )
  })
})
