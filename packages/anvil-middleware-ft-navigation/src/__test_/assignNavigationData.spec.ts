import { getNavigationForEdition as subject } from '../assignNavigationData'

const fakeEditionsUk = { current: { id: 'uk' } }
const fakeEditionsInternational = { current: { id: 'international' } }
const fakeEditionsInvalid = { current: {} }
const fakeEditionsEmpty = {}

const responseUk = {
  navbar: 'navbar-uk',
  drawer: 'drawer-uk'
}
const responseInternational = {
  navbar: 'navbar-international',
  drawer: 'drawer-international'
}

describe('anvil-middleware-ft-navigation/assign-navigation-data', () => {
  let instanceUk
  let instanceInternational
  let instanceInvalid
  let instanceEmpty

  beforeEach(() => {
    instanceUk = subject(fakeEditionsUk)
    instanceInternational = subject(fakeEditionsInternational)
    instanceInvalid = subject(fakeEditionsInvalid)
    instanceEmpty = subject(fakeEditionsEmpty)
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
