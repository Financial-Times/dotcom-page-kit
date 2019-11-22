/**
 * @jest-environment jsdom
 */
import './setup'
import React from 'react'
import { mount } from 'enzyme'

import navigationData from '../../__stories__/story-data/index'
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
    let result

    beforeAll(() => {
      result = mount(<Subject {...fixture} />)
    })

    it('renders the current edition text', () => {
      expect(result.find('.o-header__drawer-current-edition')).toHaveText('UK Edition')
    })

    it('renders the alternative edition link', () => {
      expect(result.find('[data-trackable="edition-switcher"] a')).toHaveText(
        'Switch to International Edition'
      )
    })
  })

  describe('navigation links', () => {
    let result

    beforeAll(() => {
      result = mount(<Subject {...fixture} />)
    })

    it('renders the primary link section title', () => {
      expect(result.find('.o-header__drawer-menu-item--heading').at(0)).toHaveText('Top sections')
    })

    it('renders the secondary link section title', () => {
      expect(result.find('.o-header__drawer-menu-item--heading').at(1)).toHaveText('FT recommends')
    })

    it('renders the tertiary link section divider', () => {
      expect(result.find('.o-header__drawer-menu-item--divide')).toHaveText('myFT')
    })

    it('renders primary link subsections', () => {
      const section = result
        .find('.o-header__drawer-menu-item')
        .findWhere((node) => node.key() === '/companies')
        .at(0)

      expect(section.find('.o-header__drawer-menu-link--parent')).toHaveText('Companies')
      expect(section.find('.o-header__drawer-menu-toggle')).toHaveText('Show more Companies')
      expect(section.find('.o-header__drawer-menu-link--child').length).toBe(10)
    })

    it('highlights the current page', () => {
      expect(result.find('[aria-current="page"]')).toHaveText('World')
    })
  })

  describe('user menu', () => {
    describe('for a logged in user', () => {
      let result

      beforeAll(() => {
        result = mount(<Subject {...loggedInUserFixture} />)
      })

      it('renders sign out link', () => {
        expect(result.find('a[data-trackable="Sign Out"]')).toExist()
      })

      it('renders account settings link', () => {
        expect(result.find('a[data-trackable="Account Settings"]')).toExist()
      })
    })

    describe('for an anonymous user', () => {
      let result

      beforeAll(() => {
        result = mount(<Subject {...anonymousUserFixture} />)
      })

      it('renders sign in link', () => {
        expect(result.find('a[data-trackable="Sign In"]')).toExist()
      })

      it('renders subscribe link', () => {
        expect(result.find('a[data-trackable="Subscribe"]')).toExist()
      })
    })
  })
})
