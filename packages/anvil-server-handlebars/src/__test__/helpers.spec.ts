import Handlebars from 'handlebars'
import * as helpers from '../helpers'

describe('anvil-server-handlebars/src/helpers', () => {
  describe('#dateformat', () => {
    const date = new Date('2019-04-10 13:40:21')

    it('formats as ISO date time by default', () => {
      const template = Handlebars.compile('{{#dateformat}}{{date}}{{/dateformat}}')
      const result = template({ date }, { helpers })

      expect(result).toBe('2019-04-10T12:40:21Z')
    })

    it('formats using the given format', () => {
      const template = Handlebars.compile('{{#dateformat "dddd, mmmm d, yyyy"}}{{date}}{{/dateformat}}')
      const result = template({ date }, { helpers })

      expect(result).toBe('Wednesday, April 10, 2019')
    })
  })

  describe('#ifAll', () => {
    const template = Handlebars.compile('{{#ifAll foo bar baz}}yes{{else}}no{{/ifAll}}')

    it('outputs the contents when all conditions are truthy', () => {
      const result = template({ foo: 123, bar: 'abc', baz: true }, { helpers })
      expect(result).toBe('yes')
    })

    it('does not output the contents if any condition is falsy', () => {
      const result = template({ foo: 123, bar: 'abc', baz: null }, { helpers })
      expect(result).toBe('no')
    })
  })
})
