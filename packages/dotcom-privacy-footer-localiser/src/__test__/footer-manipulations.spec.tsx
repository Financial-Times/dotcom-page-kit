/**
 * @jest-environment jsdom
 */
import 'jest-enzyme'
import React from 'react'
import { mount } from 'enzyme'
import { addDNSLinkToFooter } from '../main'

const consentPagePath = 'foo'

jest.mock('@financial-times/privacy-legislation-client', () => {
  return {
    fetchLegislation: jest.fn().mockResolvedValue({ legislation: new Set(['ccpa', 'gdpr']) }),
    buildConsentPageUrl: jest.fn(() => consentPagePath)
  }
})

const ValidFooter = () => (
  <div>
    <div id="site-footer">
      <a href="http://help.ft.com/help/legal-privacy/privacy/">Privacy</a>
    </div>
  </div>
)
const InvalidFooter = () => (
  <div>
    <div id="site-footer">
      <a href="http://help.ft.com/help/legal-privacy/something-else/">Privacy</a>
    </div>
  </div>
)
describe('dotcom-privacy-footer-localiser', () => {
  describe('if there is a Privacy link in the footer', () => {
    let links

    beforeAll(async () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      mount(<ValidFooter />, { attachTo: document.querySelector('div') })
      await addDNSLinkToFooter()
      links = document.querySelectorAll('a')
    })

    it('should insert a new link', () => {
      expect(links.length).toBe(2)
    })

    it('should insert the new link before the privacy link', () => {
      expect(links[0].href).toMatch(consentPagePath)
    })

    it('should insert the new link with the right label', () => {
      expect(links[0].text).toBe('Do Not Sell My Info')
    })
  })

  describe('if there is no Privacy link in the footer', () => {
    it('should throw an error', async () => {
      const consoleErr = window.console.error
      window.console.error = jest.fn()
      const div = document.createElement('div')
      document.body.appendChild(div)
      mount(<InvalidFooter />, { attachTo: document.querySelector('div') })
      await addDNSLinkToFooter()
      expect(window.console.error).toHaveBeenCalled()
      window.console.error = consoleErr
    })
  })
})
