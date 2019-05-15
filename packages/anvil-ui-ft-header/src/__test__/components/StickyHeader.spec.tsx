import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../../__stories__/story-data/index'
import { StickyHeader as Subject } from '../../index'

const propsAnonymous = { ...fixture, userIsAnonymous: true, userIsLoggedIn: false }
const propsLoggedIn = { ...fixture, userIsAnonymous: false, userIsLoggedIn: true }

describe('anvil-ui-ft-header/src/components/StickyHeader', () => {
  it('renders as an anonymous user', () => {
    const tree = renderer.create(<Subject {...propsAnonymous} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders as a logged in user', () => {
    const tree = renderer.create(<Subject {...propsLoggedIn} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
