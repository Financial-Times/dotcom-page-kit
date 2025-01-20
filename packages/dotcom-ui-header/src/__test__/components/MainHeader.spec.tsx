import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../fixtures/index'
import profileFixture from '../fixtures/profile'
import { MainHeader as Subject } from '../../index'

const propsAnonymous = { ...fixture, userIsAnonymous: true, userIsLoggedIn: false }
const propsLoggedIn = { ...fixture, userIsAnonymous: false, userIsLoggedIn: true }
const propsRightAligned = { ...profileFixture }
const propsAskFt = { ...fixture, showAskButton: true }

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

  it('renders ASK FT button', () => {
    const tree = renderer.create(<Subject {...propsAskFt} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
