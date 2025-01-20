/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

import navigationData from '../fixtures/index'
import { Drawer as Subject } from '../../'

const fixture = {
  data: { ...navigationData.data, currentPath: '/world' }
}

const loggedInUserFixture = {
  ...fixture,
  userIsAnonymous: false,
  userIsLoggedIn: true
}

const anonymousUserFixture = {
  ...fixture,
  userIsAnonymous: true,
  userIsLoggedIn: false
}

describe('dotcom-ui-header/src/components/drawer', () => {
  describe('editions', () => {
    it('renders the current edition text', () => {
      const { container } = render(<Subject {...fixture} />)

      expect(container.getElementsByClassName('o-header__drawer-current-edition')[0].innerHTML).toContain(
        'UK'
      )
    })

    it('renders the alternative edition link', () => {
      const { container } = render(<Subject {...fixture} />)

      const [firstLink] = Array.from(container.getElementsByClassName('o-header__drawer-menu-link'))
      expect(firstLink.innerHTML).toContain('International')
    })
  })

  describe('navigation links', () => {
    it('renders the primary link section title', () => {
      const { container } = render(<Subject {...fixture} />)

      const [firstLink] = Array.from(container.getElementsByClassName('o-header__drawer-menu-item--heading'))
      expect(firstLink.innerHTML).toContain('Top sections')
    })

    it('renders the secondary link section title', () => {
      const { container } = render(<Subject {...fixture} />)

      const secondLink = Array.from(
        container.getElementsByClassName('o-header__drawer-menu-item--heading')
      )[1]
      expect(secondLink.innerHTML).toContain('FT recommends')
    })

    it('renders the tertiary link section divider', () => {
      const { container } = render(<Subject {...fixture} />)

      const [li] = Array.from(container.getElementsByClassName('o-header__drawer-menu-list--divide'))
      expect(li.children[0].innerHTML).toContain('myFT')
    })

    it('renders primary link subsections', () => {
      const { container } = render(<Subject {...fixture} />)

      const parentHeaders = Array.from(
        container.getElementsByClassName('o-header__drawer-menu-link--parent')
      ).filter((header) => header.innerHTML.includes('Companies'))

      expect(parentHeaders.length).toBe(1)

      const toggleHeaders = Array.from(
        container.getElementsByClassName('o-header__drawer-menu-toggle')
      ).filter((header) => header.innerHTML.includes('Show more Companies'))

      expect(toggleHeaders.length).toBe(1)
    })

    it('highlights the current page', () => {
      const { container } = render(<Subject {...fixture} />)
      const currentPage = container.querySelector('[aria-current="page"]')
      expect(currentPage?.innerHTML).toContain('World')
    })
  })

  describe('user menu', () => {
    describe('for a logged in user', () => {
      it('renders sign out link', () => {
        const { container } = render(<Subject {...loggedInUserFixture} />)

        const signOutLink = container.querySelector('a[data-trackable="Sign Out"]')
        expect(signOutLink?.innerHTML).toContain('Sign Out')
      })

      it('renders settings and account link', () => {
        const { container } = render(<Subject {...loggedInUserFixture} />)

        const signOutLink = container.querySelector('a[data-trackable="Settings & Account"]')
        expect(signOutLink?.innerHTML).toContain('Settings &amp; Account')
      })
    })

    describe('for an anonymous user', () => {
      it('renders sign in link', () => {
        const { container } = render(<Subject {...anonymousUserFixture} />)

        const signInLink = container.querySelector('a[data-trackable="Sign In"')
        expect(signInLink?.innerHTML).toContain('Sign In')
      })

      it('renders subscribe link', () => {
        const { container } = render(<Subject {...anonymousUserFixture} />)

        const subscribeLink = container.querySelector('a[data-trackable="Subscribe"]')
        expect(subscribeLink?.innerHTML).toContain('Subscribe')
      })
    })
  })
})
