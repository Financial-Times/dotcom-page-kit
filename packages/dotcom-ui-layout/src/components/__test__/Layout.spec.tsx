/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

import { Layout as Subject } from '../Layout'

jest.mock('@financial-times/dotcom-ui-header', () => ({
  Header: () => <div>Header mock</div>,
  Drawer: () => <div>Drawer mock</div>,
  LogoOnly: () => <div>LogoOnly mock</div>,
  NoOutboundLinksHeader: () => <div>NoOutboundLinksHeader mock</div>
}))

jest.mock('@financial-times/dotcom-ui-footer', () => ({
  Footer: () => <div>Footer mock</div>,
  LegalFooter: () => <div>LegalFooter mock</div>
}))

describe('dotcom-ui-layout/src/components/Layout', () => {
  it('renders skip links to page landmarks', () => {
    const { container } = render(<Subject />)

    const skipToNavigationLink = container.querySelector('a[href="#site-navigation"]')
    const skipToContentLink = container.querySelector('a[href="#site-content"]')
    const skipToFooterLink = container.querySelector('a[href="#site-footer"]')

    expect(skipToNavigationLink?.innerHTML).toContain('Skip to navigation')
    expect(skipToContentLink?.innerHTML).toContain('Skip to content')
    expect(skipToFooterLink?.innerHTML).toContain('Skip to footer')
  })

  it('renders the header, drawer & footer components', () => {
    const { container } = render(<Subject />)

    expect(container.innerHTML).toContain('Header mock')
    expect(container.innerHTML).toContain('Drawer mock')
    expect(container.innerHTML).toContain('Footer mock')
  })
})

describe('header variations', () => {
  describe('with the simple variant', () => {
    it('renders the header component', () => {
      const { container } = render(<Subject headerVariant={'simple' as any} />)

      expect(container.innerHTML).toContain('Header mock')
    })

    it('renders the drawer component', () => {
      const { container } = render(<Subject headerVariant={'simple' as any} />)

      expect(container.innerHTML).toContain('Drawer mock')
    })

    it('renders the navigation skip link', () => {
      const { container } = render(<Subject headerVariant={'simple' as any} />)

      expect(container.querySelector('a[href="#site-navigation"]')).not.toBeNull()
    })
  })

  describe('with the large-logo variant', () => {
    it('renders the header component', () => {
      const { container } = render(<Subject headerVariant={'large-logo' as any} />)

      expect(container.innerHTML).toContain('Header mock')
    })

    it('renders the drawer component', () => {
      const { container } = render(<Subject headerVariant={'large-logo' as any} />)

      expect(container.innerHTML).toContain('Drawer mock')
    })

    it('renders the navigation skip link', () => {
      const { container } = render(<Subject headerVariant={'large-logo' as any} />)

      expect(container.querySelector('a[href="#site-navigation"]')).not.toBeNull()
    })
  })

  describe('with the logo-only variant', () => {
    it('renders the logo only header component', () => {
      const { container } = render(<Subject headerVariant={'logo-only' as any} />)

      expect(container.innerHTML).toContain('LogoOnly mock')
    })

    it('does not render the drawer component', () => {
      const { container } = render(<Subject headerVariant={'logo-only' as any} />)

      expect(container.innerHTML).not.toContain('Drawer mock')
    })

    it('does not render the navigation skip link', () => {
      const { container } = render(<Subject headerVariant={'logo-only' as any} />)

      expect(container.querySelector('a[href="#site-navigation"]')).toBeNull()
    })
  })

  describe('with the no-outbound-links variant', () => {
    it('renders the no-outbound-links header component', () => {
      const { container } = render(<Subject headerVariant={'no-outbound-links' as any} />)

      expect(container.innerHTML).toContain('NoOutboundLinksHeader mock')
    })

    it('does not render the drawer component', () => {
      const { container } = render(<Subject headerVariant={'no-outbound-links' as any} />)

      expect(container.innerHTML).not.toContain('Drawer mock')
    })

    it('does not render the navigation skip link', () => {
      const { container } = render(<Subject headerVariant={'no-outbound-links' as any} />)

      expect(container.querySelector('a[href="#site-navigation"]')).toBeNull()
    })
  })

  describe('with the header disabled', () => {
    it('does not render the header component', () => {
      const { container } = render(<Subject headerVariant={false} />)

      expect(container.innerHTML).not.toContain('Header mock')
    })

    it('does not render the drawer component', () => {
      const { container } = render(<Subject headerVariant={false} />)

      expect(container.innerHTML).not.toContain('Drawer mock')
    })

    it('does not render the navigation skip link', () => {
      const { container } = render(<Subject headerVariant={false} />)

      expect(container.querySelector('a[href="#site-navigation"]')).toBeNull()
    })
  })

  describe('with a custom header component', () => {
    it('renders the given component', () => {
      const { container } = render(<Subject headerComponent={<header>My custom header</header>} />)

      expect(container.innerHTML).toContain('My custom header')
    })

    it('does not render the header component', () => {
      const { container } = render(<Subject headerComponent={<header>My custom header</header>} />)

      expect(container.innerHTML).not.toContain('Header mock')
    })

    it('does not render the drawer component', () => {
      const { container } = render(<Subject headerComponent={<header>My custom header</header>} />)

      expect(container.innerHTML).not.toContain('Drawer mock')
    })

    it('does not render the navigation skip link', () => {
      const { container } = render(<Subject headerComponent={<header>My custom header</header>} />)

      expect(container.querySelector('a[href="#site-navigation"]')).toBeNull()
    })
  })
})

describe('footer variations', () => {
  describe('with the simple variant', () => {
    it('renders the footer component', () => {
      const { container } = render(<Subject footerVariant={'simple' as any} />)

      expect(container.innerHTML).toContain('Footer mock')
    })

    it('renders the footer skip link', () => {
      const { container } = render(<Subject footerVariant={'simple' as any} />)

      expect(container.querySelector('a[href="#site-footer"]')).not.toBeNull()
    })
  })

  describe('with the legal variant', () => {
    it('renders the legal footer component', () => {
      const { container } = render(<Subject footerVariant={'legal' as any} />)

      expect(container.innerHTML).toContain('LegalFooter mock')
    })

    it('renders the footer skip link', () => {
      const { container } = render(<Subject footerVariant={'legal' as any} />)

      expect(container.querySelector('a[href="#site-footer"]')).not.toBeNull()
    })
  })

  describe('with the footer disabled', () => {
    it('does not render the footer component', () => {
      const { container } = render(<Subject footerVariant={false} />)

      expect(container.innerHTML).not.toContain('Footer mock')
    })

    it('does not render the footer skip link', () => {
      const { container } = render(<Subject footerVariant={false} />)

      expect(container.querySelector('a[href="#site-footer"]')).toBeNull()
    })
  })
})

describe('with a custom footer component', () => {
  it('renders the given component', () => {
    const { container } = render(<Subject footerComponent={<footer>My custom footer</footer>} />)

    expect(container.innerHTML).toContain('My custom footer')
  })

  it('does not render the footer component', () => {
    const { container } = render(<Subject footerComponent={<footer>My custom footer</footer>} />)

    expect(container.innerHTML).not.toContain('Footer mock')
  })

  it('does not render the footer skip link', () => {
    const { container } = render(<Subject footerComponent={<footer>My custom footer</footer>} />)

    expect(container.querySelector('a[href="#site-footer"]')).toBeNull()
  })
})
