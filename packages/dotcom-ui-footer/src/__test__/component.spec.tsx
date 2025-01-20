/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

import dataFixture from './fixtures/data'
import { Footer, LegalFooter } from '../index'

describe('dotcom-ui-footer', () => {
  it('renders the available footer variants', () => {
    const footer = render(<Footer {...dataFixture} />)
    const legalFooter = render(<LegalFooter {...dataFixture} />)
    expect(footer).not.toBeNull()
    expect(legalFooter).not.toBeNull()
  })

  it('renders the copyright section', () => {
    const { container: footerContainer } = render(<Footer {...dataFixture} />)
    const { container: legalFooterContainer } = render(<LegalFooter {...dataFixture} />)

    expect(footerContainer.querySelector('.o-footer__copyright')).not.toBeNull()
    expect(legalFooterContainer.querySelector('.o-footer__copyright')).not.toBeNull()
  })

  it('renders the Nikkei banner', () => {
    const { container: footerContainer } = render(<Footer {...dataFixture} />)
    const { container: legalFooterContainer } = render(<LegalFooter {...dataFixture} />)

    expect(legalFooterContainer.querySelector('.o-footer__copyright')).not.toBeNull()
    expect(footerContainer.querySelector('.o-footer__brand-logo')).not.toBeNull()
  })

  describe('standard footer', () => {
    it('renders the navigation sections', () => {
      const { container } = render(<Footer {...dataFixture} />)

      const matrix = container.querySelector('.o-footer__matrix')

      expect(matrix).not.toBeNull()

      expect(matrix?.innerHTML).toContain('Support')
      expect(matrix?.innerHTML).toContain('Legal &amp; Privacy')
      expect(matrix?.innerHTML).toContain('Services')
      expect(matrix?.innerHTML).toContain('Tools')
    })

    it('does not render the legal links section', () => {
      const { container } = render(<Footer {...dataFixture} />)

      const legalLinks = container.querySelector('.o-footer__legal-links')

      expect(legalLinks).toBeNull()
    })

    it('renders the More from FT section', () => {
      const { container } = render(<Footer {...dataFixture} />)

      const moreFromFt = container.querySelector('.o-footer__matrix-link__copy')
      expect(moreFromFt).not.toBeNull()
    })
  })

  describe('legal footer', () => {
    it('does not render the navigation sections', () => {
      const { container } = render(<LegalFooter {...dataFixture} />)

      expect(container.querySelector('.o-footer__matrix')).toBeNull()
    })

    it('renders the legal links section', () => {
      const { container } = render(<LegalFooter {...dataFixture} />)

      expect(container.querySelector('.o-footer__legal-links')).not.toBeNull()
    })

    it('does not render the More from FT section', () => {
      const { container } = render(<LegalFooter {...dataFixture} />)

      expect(container.querySelector('.o-footer__more-from-ft')).toBeNull()
    })
  })
})
