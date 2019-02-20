import * as subject from '../'

describe('anvil-ui-bootstrap', () => {
  describe('.getConfigJSON()', () => {
    it('returns a string', () => {
      const result = subject.getConfigJSON([], [])
      // NOTE: '' !== String('')
      expect(typeof result === 'string').toBeTruthy()
    })

    it('returns a parseable JSON string', () => {
      const result = JSON.parse(subject.getConfigJSON([], []))

      expect(result.core).toBeInstanceOf(Array)
      expect(result.enhanced).toBeInstanceOf(Array)
    })
  })

  describe('.getSnippetJS()', () => {
    it('returns the JS snippet', () => {
      const result = subject.getSnippetJS()

      expect(typeof result === 'string').toBeTruthy()
      expect(result).toMatch(/isEnhancedBrowser/)
    })
  })
})
