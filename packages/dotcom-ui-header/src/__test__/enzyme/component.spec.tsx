/**
 * @jest-environment jsdom
 */
import 'jest-enzyme'
import React from 'react'
import { mount } from 'enzyme'

import dataFixture from '../../__stories__/story-data/index'
import { Header } from '../../index'

// data.currentPath to enable the mobile header
const headerFixture = {
  ...dataFixture,
  data: { ...dataFixture.data, currentPath: '/' }
}
const subscribedUserFixture = { ...dataFixture, showUserNavigation: true, userIsSubscribed: true }
const loggedInUserFixture = { ...dataFixture, showUserNavigation: true }
const anonymousUserFixture = {
  ...dataFixture,
  userIsAnonymous: true,
  userIsLoggedIn: false,
  showUserNavigation: true
}

const commonHeader = <Header {...headerFixture} />
const subscribedUserHeader = <Header {...subscribedUserFixture} />
const loggedInUserHeader = <Header {...loggedInUserFixture} />
const anonymousUserHeader = <Header {...anonymousUserFixture} />

describe('dotcom-ui-header', () => {
  const header = mount(commonHeader)

  it('renders the expected common header elements', () => {
    expect(header).not.toBeEmptyRender()
    expect(header.find('div[data-trackable="header-top"] .o-header__top-logo')).toExist()
    expect(
      header.find('div[data-trackable="header-top"] .o-header__top-link--search .o-header__top-link-label')
    ).toExist()
    expect(
      header.find('div[data-trackable="header-top"] .o-header__top-link--menu .o-header__top-link-label')
    ).toExist()
    expect(header.find('div[data-trackable="header-top"] .o-header__top-link--myft')).toExist()
  })

  it('renders an inlined SVG logo image', () => {
    expect(header.find('div[data-trackable="header-top"] .o-header__top-logo svg')).toExist()
    expect(header.find('div[data-trackable="header-top"] .o-header__top-logo title')).toHaveText(
      'Financial Times'
    )
  })

  it('renders the sticky header', () => {
    expect(header.find('.o-header--sticky')).toExist()
  })

  it('renders the mobile header', () => {
    expect(header.find('#o-header-nav-mobile')).toExist()
  })

  describe('When the user is subscribed', () => {
    const header = mount(subscribedUserHeader)

    it('renders the expected logged in user header links', () => {
      expect(header.find('a[data-trackable="Portfolio"]')).toExist()
      expect(header.find('a[data-trackable="Settings & Account"]')).toExist()
    })

    it('does not render sign in link', () => {
      expect(header.find('a[data-trackable="Subscribe"]')).not.toExist()
      expect(header.find('a[data-trackable="Sign In"]')).not.toExist()
    })
  })

  describe('When the user is logged in', () => {
    const header = mount(loggedInUserHeader)

    it('renders the expected logged in user header links', () => {
      expect(header.find('a[data-trackable="Portfolio"]')).toExist()
      expect(header.find('a[data-trackable="Settings & Account"]')).toExist()
    })

    it('does not render sign in link', () => {
      expect(header.find('a[data-trackable="Subscribe"]')).toExist()
      expect(header.find('a[data-trackable="Sign In"]')).not.toExist()
    })
  })

  describe('When the user is anonymous', () => {
    const header = mount(anonymousUserHeader)

    it('renders the expected anonymous user header links', () => {
      expect(
        header.find('.o-header__top-column .o-header__top-column--right a[data-trackable="Subscribe"]')
      ).toExist()
      expect(
        header.find('.o-header__top-column .o-header__top-column--right a[data-trackable="Sign In"]')
      ).toExist()
    })

    it('does not render the logged in user header links', () => {
      expect(header.find('a[data-trackable="Portfolio"]')).not.toExist()
      expect(header.find('a[data-trackable="Settings & Account"]')).not.toExist()
    })
  })
})
