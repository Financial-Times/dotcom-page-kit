import renderer from 'react-test-renderer'
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

describe('dotcom-ui-app-context/src/components/AppContextEmbed', () => {
  it('renders a script element containing app context properties', () => {
    const tree = renderer.create(subject({ appContext: fakeContext }))
    expect(tree).toMatchSnapshot()
  })
})
