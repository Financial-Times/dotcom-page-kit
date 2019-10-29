import path from 'path'
import { PageKitHandlebars as Subject } from '../PageKitHandlebars'

// NOTE: Tests are run from the repository root directory so we need to set the CWD
const root = path.join(__dirname, '__fixtures__')
const view = path.resolve(root, 'views/view.hbs')

describe('dotcom-server-handlebars/src/PageKitHandlebars', () => {
  let instance

  beforeEach(() => {
    instance = new Subject({
      rootDirectory: root,
      cache: true
    })
  })

  describe('.loadPartials()', () => {
    let result

    beforeEach(() => {
      result = instance.loadPartials()
    })

    it('loads and compiles partial templates from disk', () => {
      const values = Object.values(result)

      expect(values.length).toBe(3)

      values.forEach((template) => {
        expect(template).toEqual(expect.any(Function))
      })
    })

    it('caches each compiled partial template', () => {
      const keys = Object.keys(result)

      keys.forEach((key) => {
        const filename = path.join(root, `views/partials/${key}.hbs`)
        expect(instance.cache.has(filename)).toBe(true)
      })
    })
  })

  describe('.loadTemplate()', () => {
    let result

    beforeEach(() => {
      result = instance.loadTemplate(view)
    })

    it('loads and compiles a template from disk', () => {
      expect(result).toEqual(expect.any(Function))
    })

    it('caches the compiled template', () => {
      expect(instance.cache.has(view)).toBe(true)
    })
  })

  describe('.render()', () => {
    const templateContext = { title: 'Hello World', aside: 'Lorem ipsum' }

    it('can render a template from disk', () => {
      const result = instance.render(view, templateContext)

      expect(result).toContain('<h1>Hello World</h1>')
      expect(result).toContain('<aside>Lorem ipsum</aside>')
      expect(result).toMatch(/<main>.+<\/main>/s)
    })

    it('can render a given template function', () => {
      const template = instance.loadTemplate(view)
      const result = instance.render(template, templateContext)

      expect(result).toContain('<h1>Hello World</h1>')
      expect(result).toContain('<aside>Lorem ipsum</aside>')
      expect(result).toMatch(/<main>.+<\/main>/s)
    })
  })

  describe('.renderView()', () => {
    it('can render a template and fire a callback with the result', () => {
      return new Promise((done) => {
        const templateContext = { title: 'Hello World', aside: 'Lorem ipsum' }

        instance.renderView(view, templateContext, (error, result) => {
          expect(error).toBeNull()

          expect(result).toContain('<h1>Hello World</h1>')
          expect(result).toContain('<aside>Lorem ipsum</aside>')
          expect(result).toMatch(/<main>.+<\/main>/s)

          done()
        })
      })
    })
  })
})
