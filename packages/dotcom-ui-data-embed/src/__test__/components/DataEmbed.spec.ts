import renderer from 'react-test-renderer'
import { DataEmbed as subject } from '../../components/DataEmbed'

const data = {
  id: 'data-embed',
  data: {
    foo: 1,
    bar: true,
    baz: 'qux'
  }
}

describe('dotcom-ui-data-embed/src/components/dataEmbed', () => {
  it('renders a script element containing data', () => {
    const tree = renderer.create(subject(data))
    expect(tree).toMatchSnapshot()
  })
})
