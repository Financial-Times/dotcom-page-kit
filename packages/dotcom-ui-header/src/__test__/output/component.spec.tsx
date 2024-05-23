/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

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
  it('renders the expected common header elements', () => {
    const { container } = render(commonHeader)

    const logo = container.querySelector('div[data-trackable="header-top"] .o-header__top-logo')
    expect(logo?.hasChildNodes()).toBe(true)
  })

  it('renders an inlined SVG logo image', () => {
    const { container } = render(commonHeader)

    const logo = container.querySelector('div[data-trackable="header-top"] .o-header__top-logo')
    expect(logo?.hasChildNodes()).toBe(true)
    expect(logo?.innerHTML).toContain('Financial Times')
    expect(logo?.querySelector('div[data-trackable="header-top"] .o-header__top-logo svg')).not.toBeNull()
  })

  it('renders the sticky header', () => {
    const { container } = render(commonHeader)
    const header = container.querySelector('.o-header--sticky')
    expect(header).not.toBeNull()
  })

  it('renders the mobile header', () => {
    const { container } = render(commonHeader)
    const mobileHeader = container.querySelector('#o-header-nav-mobile')
    expect(mobileHeader).not.toBeNull()
  })

  describe('When the user is subscribed', () => {
    it('renders the expected logged in user header links', () => {
      const { container } = render(subscribedUserHeader)

      expect(container.querySelector('a[data-trackable="Portfolio"]')).not.toBeNull()
      expect(container.querySelector('a[data-trackable="My Account"]')).not.toBeNull()
      expect(container.querySelector('a[data-trackable="myFT Feed"]')).not.toBeNull()
    })

    it('does not render sign in link', () => {
      const { container } = render(subscribedUserHeader)

      expect(container.querySelector('a[data-trackable="Subscribe"]')).toBeNull()
      expect(container.querySelector('a[data-trackable="Sign In"]')).toBeNull()
    })
  })

  describe('When the user is logged in', () => {
    it('renders the expected logged in user header links', () => {
      const { container } = render(loggedInUserHeader)

      expect(container.querySelector('a[data-trackable="Portfolio"]')).not.toBeNull()
      expect(container.querySelector('a[data-trackable="My Account"]')).not.toBeNull()
      expect(container.querySelector('a[data-trackable="myFT Feed"]')).not.toBeNull()
    })

    it('does not render sign in link', () => {
      const { container } = render(loggedInUserHeader)

      expect(container.querySelector('a[data-trackable="Subscribe"]')).not.toBeNull()
      expect(container.querySelector('a[data-trackable="Sign In"]')).toBeNull()
    })
  })

  describe('When the user is anonymous', () => {
    it('renders the expected anonymous user header links', () => {
      const { container } = render(anonymousUserHeader)

      expect(
        container.querySelector(
          '.o-header__top-column.o-header__top-column--right a[data-trackable="Subscribe"]'
        )
      ).not.toBeNull()
      expect(
        container.querySelector(
          '.o-header__top-column.o-header__top-column--right a[data-trackable="Sign In"]'
        )
      ).not.toBeNull()
    })

    it('does not render the logged in user header links', () => {
      const { container } = render(anonymousUserHeader)

      expect(container.querySelector('a[data-trackable="Portfolio"]')).toBeNull()
      expect(container.querySelector('a[data-trackable="My Account"]')).toBeNull()
      expect(container.querySelector('a[data-trackable="myFT Feed"]')).toBeNull()
    })
  })
})
