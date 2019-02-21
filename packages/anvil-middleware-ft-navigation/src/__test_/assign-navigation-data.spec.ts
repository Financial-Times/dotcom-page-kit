import { navigationWithEditionsBasedFields as subject } from '../assign-navigation-data'

const fakeNavigation = { someKey: 'someValue' }
const fakeEditionsUk = { current: { id: 'uk' } }
const fakeEditionsInternational = { current: { id: 'international' } }
const fakeEditionsInvalid = { current: { id: 'some-id' } }
const fakeEditionsEmpty = {}

const responseUk = {
  someKey: 'someValue',
  navbar: 'navbar-uk',
  drawer: 'drawer-uk'
}
const responseInternational = {
  someKey: 'someValue',
  navbar: 'navbar-international',
  drawer: 'drawer-international'
}

describe('anvil-middleware-ft-navigation/assign-navigation-data', () => {
  let instanceUk
  let instanceInternational
  let instanceInvalid
  let instanceEmpty

  beforeEach(() => {
    instanceUk = subject(fakeNavigation, fakeEditionsUk)
    instanceInternational = subject(fakeNavigation, fakeEditionsInternational)
    instanceInvalid = subject(fakeNavigation, fakeEditionsInvalid)
    instanceEmpty = subject(fakeNavigation, fakeEditionsEmpty)
  })

  afterEach(() => {
    instanceUk = null
    instanceInternational = null
    jest.clearAllMocks()
  })

  describe("when the edition is 'uk'", () => {
    it('attached uk edition navigation properties', () => {
      expect(instanceUk).toEqual(responseUk)
    })
  })

  describe("when the edition is 'international'", () => {
    it('attached international edition navigation properties', () => {
      expect(instanceInternational).toEqual(responseInternational)
    })
  })

  describe('when the edition is empty or invalid', () => {
    it('defaults to the UK edition if the edition is invalid', () => {
      expect(instanceInvalid).toEqual(responseUk)
    })

    it('defaults to the UK edition if the edition is missing', () => {
      expect(instanceEmpty).toEqual(responseUk)
    })
  })
})
