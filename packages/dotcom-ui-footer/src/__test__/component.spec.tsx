/**
 * @jest-environment jsdom
 */
import 'jest-enzyme'
import React from 'react'
import { mount } from 'enzyme'

import dataFixture from '../__stories__/story-data'
import { Footer, LegalFooter } from '../index'

describe('dotcom-ui-footer', () => {
  const footer = mount(<Footer {...dataFixture} />)
  const legalFooter = mount(<LegalFooter {...dataFixture} />)

  it('renders the available footer variants', () => {
    expect(footer).not.toBeEmptyRender()
    expect(legalFooter).not.toBeEmptyRender()
  })

  it('renders the copyright section', () => {
    expect(footer.find('.o-footer__copyright')).toExist()
    expect(legalFooter.find('.o-footer__copyright')).toExist()
  })

  it('renders the Nikkei banner', () => {
    expect(footer.find('.o-footer__copyright')).toExist()
    expect(legalFooter.find('.o-footer__brand-logo')).toExist()
  })

  it('renders a custom class on the footer', () => {
    dataFixture.customClass = 'foo'
    const footer = mount(<Footer {...dataFixture} />)
    const legalFooter = mount(<Footer {...dataFixture} />)
    expect(footer.find('.o-footer').hasClass('foo')).toBe(true)
    expect(legalFooter.find('.o-footer').hasClass('foo')).toBe(true)
  })

  describe('standard footer', () => {
    it('renders the navigation sections', () => {
      expect(footer).not.toBeEmptyRender()
      expect(footer.find('.o-footer__matrix')).toIncludeText('Support')
      expect(footer.find('.o-footer__matrix')).toIncludeText('Legal & Privacy')
      expect(footer.find('.o-footer__matrix')).toIncludeText('Services')
      expect(footer.find('.o-footer__matrix')).toIncludeText('Tools')
    })

    it('does not render the legal links section', () => {
      expect(footer.find('.o-footer__legal-links')).not.toExist()
    })

    it('renders the More from FT section', () => {
      expect(footer.find('.o-footer__more-from-ft')).toExist()
    })
  })

  describe('legal footer', () => {
    it('does not render the navigation sections', () => {
      expect(legalFooter.find('.o-footer__matrix')).not.toExist()
    })

    it('renders the legal links section', () => {
      expect(legalFooter.find('.o-footer__legal-links')).toExist()
    })

    it('does not render the More from FT section', () => {
      expect(legalFooter.find('.o-footer__more-from-ft')).not.toExist()
    })
  })
})
