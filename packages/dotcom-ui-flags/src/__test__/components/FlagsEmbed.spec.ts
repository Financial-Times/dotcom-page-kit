import renderer from 'react-test-renderer'
import { FlagsEmbed as subject } from '../../components/FlagsEmbed'

const flags = {
  foo: 1,
  baz: 'qux'
}

describe('dotcom-ui-flags/src/components/FlagsEmbed', () => {
  it('renders a script element containing flags', () => {
    const tree = renderer.create(subject({ flags }))
    expect(tree).toMatchSnapshot()
  })
})
