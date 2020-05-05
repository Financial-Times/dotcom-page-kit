import renderer from 'react-test-renderer'
import { ClientEmbed as subject } from '../components/ClientEmbed'

const data = {
  id: 'TEST',
  data: {
    property: 'value',
    secondProperty: 'secondValue'
  }
}

describe('dotcom-ui-client-embed/src/components/clientEmbed', () => {
  it('renders a script element containing data', () => {
    const tree = renderer.create(subject(data))
    expect(tree).toMatchSnapshot()
  })
})
