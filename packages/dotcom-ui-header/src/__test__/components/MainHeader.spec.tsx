import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../../__stories__/story-data/index'
import profileFixture from '../../__stories__/story-data/profile'
import { MainHeader as Subject } from '../../index'

const propsAnonymous = { ...fixture, userIsAnonymous: true, userIsLoggedIn: false }
const propsLoggedIn = { ...fixture, userIsAnonymous: false, userIsLoggedIn: true }
const propsRightAligned = { ...profileFixture }

describe('dotcom-ui-header/src/components/MainHeader', () => {
  it('renders as an anonymous user', () => {
    const tree = renderer.create(<Subject {...propsAnonymous} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders as a logged in user', () => {
    const tree = renderer.create(<Subject {...propsLoggedIn} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a right aligned subnav', () => {
    const tree = renderer.create(<Subject {...propsRightAligned} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
