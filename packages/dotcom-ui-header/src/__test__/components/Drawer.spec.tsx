import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../../__stories__/story-data/index'
import { Drawer as Subject } from '../../index'

const propsAnonymous = {
  ...fixture,
  userIsAnonymous: true,
  userIsLoggedIn: false,
  userIsSubscribed: false,
  showSubscribeMessage: true
}
const propsLoggedIn = {
  ...fixture,
  userIsAnonymous: false,
  userIsLoggedIn: true,
  userIsSubscribed: false,
  showSubscribeMessage: true
}
const propsSubscribed = {
  ...fixture,
  userIsAnonymous: false,
  userIsLoggedIn: true,
  userIsSubscribed: true,
  showSubscribeMessage: true
}

describe('dotcom-ui-header/src/components/Drawer', () => {
  it('renders as an anonymous user', () => {
    const tree = renderer.create(<Subject {...propsAnonymous} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders as a logged in user', () => {
    const tree = renderer.create(<Subject {...propsLoggedIn} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders as a subscribed user', () => {
    const tree = renderer.create(<Subject {...propsSubscribed} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
