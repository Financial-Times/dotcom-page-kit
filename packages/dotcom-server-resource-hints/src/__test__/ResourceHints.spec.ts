import { ResourceHints as Subject } from '../ResourceHints'

const fixture = Object.freeze(['style.css', 'script.js', 'image.png', 'font.woff'])

describe('dotcom-server-resource-hints/src/ResourceHints', () => {
  let instance

  beforeEach(() => {
    instance = new Subject()
    fixture.forEach((item) => instance.add(item))
  })

  describe('.add()', () => {
    it('appends each file to a list', () => {
      expect(instance.files.size).toBe(fixture.length)
    })
  })

  describe('.toString()', () => {
    it('returns a formatted string of headers', () => {
      const result = instance.toString()

      expect(result.split(',').length).toBe(4)

      expect(result).toMatch('as="style"')
      expect(result).toMatch('as="script"')
      expect(result).toMatch('as="image"')
      expect(result).toMatch('as="font"')
    })
  })
})
