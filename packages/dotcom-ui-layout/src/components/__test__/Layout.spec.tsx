/**
 * @jest-environment jsdom
 */
import 'jest-enzyme'
import React from 'react'
import { shallow } from 'enzyme'

import { Layout as Subject } from '../Layout'
import { Header, Drawer, LogoOnly, NoOutboundLinksHeader } from '@financial-times/dotcom-ui-header'
import { Footer, LegalFooter } from '@financial-times/dotcom-ui-footer'

describe('dotcom-ui-layout/src/components/Layout', () => {
  const result = shallow(<Subject />)

  it('renders skip links to page landmarks', () => {
    expect(result.find('a[href="#site-navigation"]')).toHaveText('Skip to navigation')
    expect(result.find('a[href="#site-content"]')).toHaveText('Skip to content')
    expect(result.find('a[href="#site-footer"]')).toHaveText('Skip to footer')
  })

  it('renders the header and drawer components', () => {
    expect(result.find(Header)).toExist()
    expect(result.find(Drawer)).toExist()
  })

  it('renders the footer component', () => {
    expect(result.find(Footer)).toExist()
  })

  describe('header variations', () => {
    describe('with the simple variant', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject headerVariant={'simple' as any} />)
      })

      it('renders the header component', () => {
        expect(result.find(Header)).toExist()
      })

      it('renders the drawer component', () => {
        expect(result.find(Drawer)).toExist()
      })

      it('renders the navigation skip link', () => {
        expect(result.find('a[href="#site-navigation"]')).toExist()
      })
    })

    describe('with the large-logo variant', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject headerVariant={'large-logo' as any} />)
      })

      it('renders the header component', () => {
        expect(result.find(Header)).toExist()
      })

      it('renders the drawer component', () => {
        expect(result.find(Drawer)).toExist()
      })

      it('renders the navigation skip link', () => {
        expect(result.find('a[href="#site-navigation"]')).toExist()
      })
    })

    describe('with the logo-only variant', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject headerVariant={'logo-only' as any} />)
      })

      it('renders the logo only header component', () => {
        expect(result.find(LogoOnly)).toExist()
      })

      it('does not render the drawer component', () => {
        expect(result.find(Drawer)).not.toExist()
      })

      it('does not render the navigation skip link', () => {
        expect(result.find('a[href="#site-navigation"]')).not.toExist()
      })
    })

    describe('with the no-outbound-links variant', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject headerVariant={'no-outbound-links' as any} />)
      })

      it('renders the no-outbound-links header component', () => {
        expect(result.find(NoOutboundLinksHeader)).toExist()
      })

      it('does not render the drawer component', () => {
        expect(result.find(Drawer)).not.toExist()
      })

      it('does not render the navigation skip link', () => {
        expect(result.find('a[href="#site-navigation"]')).not.toExist()
      })
    })

    describe('with the header disabled', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject headerVariant={false} />)
      })

      it('does not render the header component', () => {
        expect(result.find(Header)).not.toExist()
      })

      it('does not render the drawer component', () => {
        expect(result.find(Drawer)).not.toExist()
      })

      it('does not render the navigation skip link', () => {
        expect(result.find('a[href="#site-navigation"]')).not.toExist()
      })
    })

    describe('with a custom header component', () => {
      let result

      beforeAll(() => {
        const customHeader = <header>My custom header</header>
        result = shallow(<Subject headerComponent={customHeader} />)
      })

      it('renders the given component', () => {
        expect(result.find('header')).toHaveText('My custom header')
      })

      it('does not render the header component', () => {
        expect(result.find(Header)).not.toExist()
      })

      it('does not render the drawer component', () => {
        expect(result.find(Drawer)).not.toExist()
      })

      it('does not render the navigation skip link', () => {
        expect(result.find('a[href="#site-navigation"]')).not.toExist()
      })
    })
  })

  describe('footer variations', () => {
    describe('with the simple variant', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject footerVariant={'simple' as any} />)
      })

      it('renders the footer component', () => {
        expect(result.find(Footer)).toExist()
      })

      it('renders the footer skip link', () => {
        expect(result.find('a[href="#site-footer"]')).toExist()
      })
    })

    describe('with the legal variant', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject footerVariant={'legal' as any} />)
      })

      it('renders the legal footer component', () => {
        expect(result.find(LegalFooter)).toExist()
      })

      it('renders the footer skip link', () => {
        expect(result.find('a[href="#site-footer"]')).toExist()
      })
    })

    describe('with the footer disabled', () => {
      let result

      beforeAll(() => {
        result = shallow(<Subject footerVariant={false} />)
      })

      it('does not render the footer component', () => {
        expect(result.find(Footer)).not.toExist()
      })

      it('does not render the footer skip link', () => {
        expect(result.find('a[href="#site-footer"]')).not.toExist()
      })
    })

    describe('with a custom footer component', () => {
      let result

      beforeAll(() => {
        const customFooter = <footer>My custom footer</footer>
        result = shallow(<Subject footerComponent={customFooter} />)
      })

      it('renders the given component', () => {
        expect(result.find('footer')).toHaveText('My custom footer')
      })

      it('does not render the footer component', () => {
        expect(result.find(Footer)).not.toExist()
      })

      it('does not render the footer skip link', () => {
        expect(result.find('a[href="#site-footer"]')).not.toExist()
      })
    })
  })
})
