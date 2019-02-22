import * as subject from '../'

describe('anvil-ui-bootstrap', () => {
  describe('.formatConfigJSON()', () => {
    it('returns a string', () => {
      const result = subject.formatConfigJSON([], [])
      // NOTE: '' !== String('')
      expect(typeof result === 'string').toBeTruthy()
    })

    it('returns a parseable JSON string', () => {
      const result = JSON.parse(subject.formatConfigJSON([], []))

      expect(result.core).toBeInstanceOf(Array)
      expect(result.enhanced).toBeInstanceOf(Array)
    })
  })

  describe('.getBootstrapJS()', () => {
    it('returns the JS snippet', () => {
      const result = subject.getBootstrapJS()

      expect(typeof result === 'string').toBeTruthy()
      expect(result).toMatch(/isEnhancedBrowser/)
    })
  })
})
