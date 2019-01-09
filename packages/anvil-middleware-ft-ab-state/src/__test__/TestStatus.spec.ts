import Subject from '../TestStatus'

describe('anvil-middleware-ft-ab-test/src/parseTestList', () => {
  let instance

  beforeEach(() => {
    instance = new Subject({ testList: 'headlineTesting:variant1,premiumCohort:on,fcfABTest:1' })
  })

  describe('.get()', () => {
    it('provides access to individual test statuses', () => {
      expect(instance.get('headlineTesting')).toEqual('variant1')
    })

    it('parses the test status', () => {
      expect(instance.get('premiumCohort')).toEqual(true)
      expect(instance.get('fcfABTest')).toEqual(1)
    })
  })

  describe('.toString()', () => {
    it('returns the original test list string', () => {
      expect(instance.toString()).toEqual('headlineTesting:variant1,premiumCohort:on,fcfABTest:1')
    })
  })
})
