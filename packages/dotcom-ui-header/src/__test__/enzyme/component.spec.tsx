import React from 'react'
import { mount} from 'enzyme';

import dataFixture from '../../__stories__/story-data/index'
import { Header } from '../../index'

// disableSticky to enable the sticky header
// data.currentPath to enable the mobile header
const headerFixture = {...dataFixture, disableSticky: false, data:{...dataFixture.data, currentPath:'/'} }
const loggedInUserFixture = {...dataFixture, showUserNavigation: true}
const anonymousUserFixture = {...dataFixture, userIsAnonymous: true, userIsLoggedIn: false, showUserNavigation: true}

const commonHeader = <Header {...headerFixture} />
const loggedInUserHeader = <Header {...loggedInUserFixture} />
const anonymousUserHeader = <Header {...anonymousUserFixture} />

const logoLink =
`<a class="o-header__top-logo" data-trackable="logo" href="/" title="Go to Financial Times homepage">
<span class="o-header__visually-hidden">Financial Times</span>
</a>`
const portfolioLink = '<a class="o-header__nav-link" href="https://markets.ft.com/data/portfolio/dashboard" data-trackable="Portfolio">Portfolio</a>'
const accountSettingsLink = '<a class="o-header__nav-link" href="https://myaccount.ft.com/details/core/view" data-trackable="Account Settings">Account Settings</a>'
const signInLink = '<a class="o-header__nav-link" href="/login?location=#" data-trackable="Sign In">Sign In</a>'
const subscribeLink = '<a class="o-header__anon-link" href="/products?segmentId=#" data-trackable="Subscribe">Subscribe</a>'
const myFTLink = '<a class="o-header__top-link o-header__top-link--myft" href="/myft" data-trackable="my-ft" data-tour-stage="myFt" aria-label="My F T"><span class="o-header__visually-hidden">myFT</span></a>'
const menuIcon = '<span class="o-header__top-link-label">Open drawer menu</span>'
const searchIcon = '<span class="o-header__top-link-label">Open search bar</span>'

describe('dotcom-ui-header', () => {
  const header = mount(commonHeader);

  it('renders the expected common header elements', () => {
    expect(header).not.toBeEmptyRender();
    expect(header.find('div[data-trackable="header-top"] .o-header__top-logo')).toHaveHTML(logoLink);
    expect(header.find('div[data-trackable="header-top"] .o-header__top-link--search .o-header__top-link-label')).toHaveHTML(searchIcon)
    expect(header.find('div[data-trackable="header-top"] .o-header__top-link--menu .o-header__top-link-label')).toHaveHTML(menuIcon)
    expect(header.find('div[data-trackable="header-top"] .o-header__top-link--myft')).toHaveHTML(myFTLink)
  });

  it('renders the sticky header', () => {
    expect(header.find('.o-header--sticky')).toExist()
  });

  it('renders the mobile header', () => {
    expect(header.find('#o-header-nav-mobile')).toExist()
  });

  describe('When the user is logged in', () => {
    const header = mount(loggedInUserHeader);

    it('renders the expected logged in user header links', () => {
      expect(header.find('a[data-trackable="Portfolio"]')).toHaveHTML(portfolioLink);
      expect(header.find('a[data-trackable="Account Settings"]')).toHaveHTML(accountSettingsLink);
    })

    it('does not render the anonymous user header links', () => {
      expect(header.find('a[data-trackable="Subscribe"]')).not.toExist();
      expect(header.find('a[data-trackable="Sign In"]')).not.toExist();
    });
  });

  describe('When the user is anonymous', () => {
    const header = mount(anonymousUserHeader);

    it('renders the expected anonymous user header links', () => {
      expect(header.find('.o-header__anon-item a[data-trackable="Subscribe"]')).toHaveHTML(subscribeLink);
      expect(header.find('.o-header__nav-item a[data-trackable="Sign In"]')).toHaveHTML(signInLink);
    })

    it('does not render the logged in user header links', () => {
      expect(header.find('a[data-trackable="Portfolio"]')).not.toExist();
      expect(header.find('a[data-trackable="Account Settings"]')).not.toExist();
    });
  });

});

