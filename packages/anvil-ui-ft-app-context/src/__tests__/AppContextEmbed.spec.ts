import { AppContextEmbed as subject } from '../components/AppContextEmbed'
import { TAppContext } from '../types'

const fakeContext: TAppContext = {
  appName: 'app-name',
  appVersion: '123',
  edition: 'uk',
  product: 'next',
  abTestState: 'someCohort:on',
  isProduction: true
}

describe('anvil-ui-ft-context/src/components/AppContextEmbed', () => {
  it('returns a frozen object', () => {
    const result = subject({ context: fakeContext })
    expect(Object.isFrozen(result)).toBe(true)
  })

  it('returns a react element for generating HTML script', () => {
    const result = subject({ context: fakeContext })
    expect(result.type).toBe('script')
  })

  it('contains the expected context properties', () => {
    const result = subject({ context: fakeContext })
    const scriptHTML = result.props.dangerouslySetInnerHTML.__html
    expect(scriptHTML).toContain('"appName":"app-name"')
    expect(scriptHTML).toContain('"appVersion":"123"')
  })
})
