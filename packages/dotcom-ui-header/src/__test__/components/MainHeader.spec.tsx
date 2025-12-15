import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../fixtures/index'
import profileFixture from '../fixtures/profile'
import { MainHeader as Subject } from '../../index'

const propsAnonymous = { ...fixture, userIsAnonymous: true, userIsLoggedIn: false }
const propsLoggedIn = { ...fixture, userIsAnonymous: false, userIsLoggedIn: true }
const propsLoggedInWithRestart = {
  ...fixture,
  userIsAnonymous: false,
  userIsLoggedIn: true,
  showRestartSubscriptionButton: true
}
const propsRightAligned = { ...profileFixture }
const propsAskFt = { ...fixture, showAskButton: true }
const propsProDropdown = { ...fixture, showProNavigation: true }
const propsMprButton = { ...fixture, showMprButton: true }

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

  it('renders FT Pro Dropdown menu', () => {
    const tree = renderer.create(<Subject {...propsProDropdown} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders restart subscription button (but no subscribe button) when showRestartSubscriptionButton is true', () => {
    const tree = renderer.create(<Subject {...propsLoggedInWithRestart} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders MPR button', () => {
    const tree = renderer.create(<Subject {...propsMprButton} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('not renders MPR button by default', () => {
    const tree = renderer.create(<Subject {...fixture} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
