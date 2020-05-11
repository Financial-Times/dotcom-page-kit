import renderer from 'react-test-renderer'
import { DataEmbed as subject } from '../../components/DataEmbed'

const data = {
  id: 'TEST',
  data: {
    property: 'value',
    secondProperty: 'secondValue'
  }
}

describe('dotcom-ui-data-embed/src/components/DataEmbed', () => {
  it('renders a script element containing data', () => {
    const tree = renderer.create(subject(data))
    expect(tree).toMatchSnapshot()
  })
})
