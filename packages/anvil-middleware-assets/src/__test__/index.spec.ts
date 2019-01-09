import { init } from '../index'

let instanceWithStaticHost
let instanceNoStaticHost

jest.mock('@financial-times/anvil-server-asset-loader')

describe('anvil-middleware-assets', () => {
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
      expect(item).toHaveLength(3)
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
