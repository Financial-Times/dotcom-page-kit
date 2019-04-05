import path from 'path'
import Handlebars from 'handlebars'
import Subject from '../HandlebarsRenderer'

// NOTE: Tests are run from the repository root directory so we need to set the CWD
const root = path.join(__dirname, '__fixtures__')
const view = path.resolve(root, 'views', 'view.hbs')

describe('anvil-server-handlebars/src/HandlebarsRenderer', () => {
  let instance

  beforeEach(() => {
    instance = new Subject({
      handlebars: Handlebars,
      rootDirectory: root
    })
  })

  describe('.render()', () => {
    it('can render a template', () => {
      const context = { title: 'Hello World', aside: 'Lorem ipsum' }
      const result = instance.render(view, context)

      expect(result).toContain('<h1>Hello World</h1>')
      expect(result).toContain('<aside>Lorem ipsum</aside>')
    })
  })

  describe('.renderView()', () => {
    it('can render a template callback when done', (done) => {
      const context = { title: 'Hello World', aside: 'Lorem ipsum' }

      instance.renderView(view, context, (_, result) => {
        expect(result).toContain('<h1>Hello World</h1>')
        expect(result).toContain('<aside>Lorem ipsum</aside>')

        done()
      })
    })
  })
})
