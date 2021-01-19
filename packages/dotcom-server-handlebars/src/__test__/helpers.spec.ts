import { compile } from 'handlebars'
import * as helpers from '../helpers'

describe('dotcom-server-handlebars/src/helpers', () => {
  describe('block helpers', () => {
    describe('#capture', () => {
      it('captures the string and assigns it to a variable', () => {
        const template = compile('{{#capture "myOutput"}}Hello, World!{{/capture}}')
        const templateData = {} as { [key: string]: any }
        const result = template(templateData, { helpers })

        expect(templateData.myOutput).toBe('Hello, World!')
        expect(result).toBe('')
      })
    })

    describe('#dateformat', () => {
      const date = new Date('2019-04-10 13:40:21 GMT+0100 (BST)')

      it('formats as ISO date time by default', () => {
        const template = compile('{{#dateformat}}{{date}}{{/dateformat}}')
        const result = template({ date }, { helpers })

        expect(result).toBe('2019-04-10T12:40:21Z')
      })

      it('formats using the given format', () => {
        const template = compile('{{#dateformat "dddd, mmmm d, yyyy"}}{{date}}{{/dateformat}}')
        const result = template({ date }, { helpers })

        expect(result).toBe('Wednesday, April 10, 2019')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#dateformat "" ""}}{{date}}{{/dateformat}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#ifAll', () => {
      const template = compile('{{#ifAll foo bar baz}}yes{{else}}no{{/ifAll}}')

      it('outputs the contents when all parameters are truthy', () => {
        const result = template({ foo: 123, bar: 'abc', baz: true }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameters are falsy', () => {
        const result = template({ foo: 123, bar: 'abc', baz: false }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#ifSome}}yes{{/ifSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#ifEquals', () => {
      const template = compile('{{#ifEquals foo bar}}yes{{else}}no{{/ifEquals}}')

      it('outputs the contents parameters are strictly equal', () => {
        const result = template({ foo: true, bar: true }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameter is not strictly equal', () => {
        const result = template({ foo: true, bar: null }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#ifEquals}}yes{{/ifEquals}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#ifEqualsSome', () => {
      const template = compile('{{#ifEqualsSome foo bar baz}}yes{{else}}no{{/ifEqualsSome}}')

      it('outputs the contents if parameters are strictly equal', () => {
        const result = template({ foo: true, bar: true, baz: true }, { helpers })
        expect(result).toBe('yes')
      })

      it('outputs true if first parameter is equal', () => {
        const result = template({ foo: true, bar: false, baz: true }, { helpers })
        expect(result).toBe('yes')
      })

      it('outputs true if second parameter is equal', () => {
        const result = template({ foo: true, bar: true, baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('outputs false if neither parameter is equal', () => {
        const result = template({ foo: true, bar: false, baz: false }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#ifEqualsSome}}yes{{/ifEqualsSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#ifSome', () => {
      const template = compile('{{#ifSome foo bar baz}}yes{{else}}no{{/ifSome}}')

      it('outputs the contents if at least one parameter is truthy', () => {
        const result = template({ foo: 123, bar: '', baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if all parameters are falsy', () => {
        const result = template({ foo: 0, bar: '', baz: false }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#ifSome}}yes{{/ifSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#renderReactComponent', () => {
      it('renders the specified component (exported as a default CJS Module export) from a local path', () => {
        const template = compile(`{{{renderReactComponent
          localPath="packages/dotcom-server-handlebars/src/__test__/__fixtures__/components/DefaultExportComponentCJS"
          text="foo"
        }}}`)
        const result = template({}, { helpers })

        expect(result).toBe('<div>foo</div>')
      })

      it('renders the specified component (exported as a default ES Module export) from a local path', () => {
        const template = compile(`{{{renderReactComponent
          localPath="packages/dotcom-server-handlebars/src/__test__/__fixtures__/components/DefaultExportComponentES"
          text="bar"
        }}}`)
        const result = template({}, { helpers })

        expect(result).toBe('<div>bar</div>')
      })

      it('renders the specified component (exported as a named CJS Module export) from a local path', () => {
        const template = compile(`{{{renderReactComponent
          localPath="packages/dotcom-server-handlebars/src/__test__/__fixtures__/components/NamedExportComponentCJS"
          namedExport="Component"
          text="baz"
        }}}`)
        const result = template({}, { helpers })

        expect(result).toBe('<div>baz</div>')
      })

      it('renders the specified component (exported as a named ES Module export) from a local path', () => {
        const template = compile(`{{{renderReactComponent
          localPath="packages/dotcom-server-handlebars/src/__test__/__fixtures__/components/NamedExportComponentES"
          namedExport="Component"
          text="qux"
        }}}`)
        const result = template({}, { helpers })

        expect(result).toBe('<div>qux</div>')
      })

      it('throws if mandatory parameters are not provided', () => {
        const template = compile('{{{renderReactComponent}}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#resize', () => {
      it('formats the image as an image service URL', () => {
        const template = compile('{{#resize 640}}http://website.com/picture.jpg{{/resize}}')
        const result = template({}, { helpers })

        expect(result).toBe(
          'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fwebsite.com%2Fpicture.jpg?width=640&source=next&fit=scale-down'
        )
      })

      it('accepts named parameters', () => {
        const template = compile('{{#resize 640 fit="contain"}}http://website.com/picture.jpg{{/resize}}')
        const result = template({}, { helpers })

        expect(result).toBe(
          'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fwebsite.com%2Fpicture.jpg?width=640&source=next&fit=contain'
        )
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#resize}}http://website.com/picture.jpg{{/resize}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#slice', () => {
      it('slices a given array and iterates over the new array', () => {
        const template = compile('{{#slice items offset="2" limit="3"}}{{this}}{{/slice}}')
        const result = template({ items: [1, 2, 3, 4, 5, 6] }, { helpers })

        expect(result).toBe('345')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#slice offset="2" limit="3"}}{{this}}{{/slice}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#unlessAll', () => {
      const template = compile('{{#unlessAll foo bar baz}}yes{{else}}no{{/unlessAll}}')

      it('outputs the contents if all parameters are falsy', () => {
        const result = template({ foo: 0, bar: '', baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameters are truthy', () => {
        const result = template({ foo: 0, bar: '', baz: true }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#unlessAll}}yes{{/unlessAll}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#unlessEquals', () => {
      const template = compile('{{#unlessEquals foo bar}}yes{{else}}no{{/unlessEquals}}')

      it('outputs the contents if all parameters are falsy', () => {
        const result = template({ foo: true, bar: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameters are truthy', () => {
        const result = template({ foo: true, bar: true }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#unlessEquals}}yes{{/unlessEquals}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#unlessSome', () => {
      const template = compile('{{#unlessSome foo bar baz}}yes{{else}}no{{/unlessSome}}')

      it('outputs the contents if any parameters are falsy', () => {
        const result = template({ foo: 1, bar: 'abc', baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if all parameters are truthy', () => {
        const result = template({ foo: 1, bar: 'abc', baz: true }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{#unlessSome}}yes{{/unlessSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })
  })

  describe('inline helpers', () => {
    describe('array', () => {
      it('converts all parameters into one array', () => {
        const template = compile('{{array foo bar baz}}')
        const result = template({ foo: 1, bar: 2, baz: 3 }, { helpers })

        expect(result).toBe('1,2,3')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{array}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('concat', () => {
      it('concatenates all parameters into one string', () => {
        const template = compile('{{concat "Welcome to " place ", " name}}')
        const result = template({ place: 'Hell', name: 'human' }, { helpers })

        expect(result).toBe('Welcome to Hell, human')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{concat}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('encode', () => {
      it('encodes the parameter as a URI component', () => {
        const template = compile('{{{encode title}}}')
        const result = template({ title: 'http://www.foo.com?bar=baz&qux=«»' }, { helpers })

        expect(result).toBe('http%3A%2F%2Fwww.foo.com%3Fbar%3Dbaz%26qux%3D%C2%AB%C2%BB')
      })

      it('encodes the parameter as a complete URI', () => {
        const template = compile('{{{encode title mode="uri"}}}')
        const result = template({ title: 'http://www.foo.com?bar=baz&qux=«»' }, { helpers })

        expect(result).toBe('http://www.foo.com?bar=baz&qux=%C2%AB%C2%BB')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{encode}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('json', () => {
      it('stringifies the parameter', () => {
        const template = compile('{{{json data}}}')
        const result = template({ data: { foo: 'bar', baz: 123, qux: true } }, { helpers })

        expect(result).toBe('{"foo":"bar","baz":123,"qux":true}')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = compile('{{json}}')
        expect(() => template({}, { helpers })).toThrow()
      })

      it('throws if the user tries to output the @root context', () => {
        const template = compile('{{json data}}')
        expect(() => template({ data: { _locals: true } }, { helpers })).toThrow()
      })
    })
  })
})
