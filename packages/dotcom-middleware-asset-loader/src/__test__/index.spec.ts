import { init } from '../index'

let instanceWithStaticHost
let instanceNoStaticHost

jest.mock('@financial-times/dotcom-server-asset-loader')

describe('dotcom-middleware-asset-loader', () => {
  beforeEach(() => {
    instanceWithStaticHost = init({ hostStaticAssets: true })
    instanceNoStaticHost = init({ hostStaticAssets: false })
  })

  afterEach(() => {
    instanceWithStaticHost = null
    instanceNoStaticHost = null
  })

  it('returns an array of handler functions', () => {
    expect(instanceWithStaticHost).toBeInstanceOf(Array)

    instanceWithStaticHost.forEach((item) => {
      expect(item).toBeInstanceOf(Function)
    })
  })

  describe('with hostStaticAssets enabled', () => {
    it('returns multiple handlers', () => {
      expect(instanceWithStaticHost).toHaveLength(2)
    })

    it('returns an instance of the router', () => {
      expect(instanceWithStaticHost[1].name).toEqual('router')
    })
  })

  describe('without hostStaticAssets enabled', () => {
    it('returns one handler', () => {
      expect(instanceNoStaticHost).toHaveLength(1)
    })
  })
})
