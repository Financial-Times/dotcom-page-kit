import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../fixtures/index'
import { StickyHeader as Subject } from '../../index'

const propsAnonymous = { ...fixture, userIsAnonymous: true, userIsLoggedIn: false }
const propsLoggedIn = { ...fixture, userIsAnonymous: false, userIsLoggedIn: true }
const propsAskFt = { ...fixture, showAskButton: true }
const propsProDropdown = { ...fixture, showProDropdown: true }

describe('dotcom-ui-header/src/components/StickyHeader', () => {
  it('renders as an anonymous user', () => {
    const tree = renderer.create(<Subject {...propsAnonymous} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders as a logged in user', () => {
    const tree = renderer.create(<Subject {...propsLoggedIn} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders ASK FT button', () => {
    const tree = renderer.create(<Subject {...propsAskFt} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders FT Pro dropdown menu', () => {
    const tree = renderer.create(<Subject {...propsProDropdown} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
