import * as subject from '../editions'

describe('anvil-server-ft-navigation/src/editions', () => {
  describe('.isEdition()', () => {
    it('returns true for editions which exist', () => {
      expect(subject.isEdition('uk')).toBe(true)
    })

    it('returns false for editions which do not exist', () => {
      expect(subject.isEdition('london')).toBe(false)
    })
  })

  describe('.getEditions()', () => {
    it('returns the current selected edition', () => {
      const result = subject.getEditions('uk')
      expect(result.current).toEqual(expect.objectContaining({ id: 'uk' }))
    })

    it('returns the all other editions', () => {
      const result = subject.getEditions('uk')
      expect(result.others).toEqual([expect.objectContaining({ id: 'international' })])
    })
  })
})
