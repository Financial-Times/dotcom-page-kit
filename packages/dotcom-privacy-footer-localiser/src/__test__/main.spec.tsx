/**
 * @jest-environment jsdom
 */
import 'jest-enzyme'
import React from 'react'
import { mount } from 'enzyme'
import { addDNSLinkToFooter, adaptPrivacyLinkToLegislation } from '../main'

const consentPagePath = 'foo'

jest.mock('@financial-times/privacy-legislation-client', () => {
  return {
    fetchLegislation: jest.fn().mockResolvedValue({ legislation: new Set(['ccpa', 'gdpr']) }),
    buildConsentPageUrl: jest.fn(() => consentPagePath)
  }
})

const wait = (ms) => setTimeout(() => Promise.resolve(), ms)

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
  describe('the addDNSLinkToFooter method', () => {
    describe('if there is a Privacy link in the footer', () => {
      let links

      beforeAll(async () => {
        document.body.innerHTML = ''
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
      it('should call console.error', async () => {
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

  describe('the adaptPrivacyLinkToLegislation method', () => {
    describe('if there is a Privacy link in the footer', () => {
      let links

      beforeAll(async () => {
        document.body.innerHTML = ''
        const div = document.createElement('div')
        document.body.appendChild(div)
        mount(<ValidFooter />, { attachTo: document.querySelector('div') })
        await wait(1000)
        await adaptPrivacyLinkToLegislation()
        await wait(1000)
        links = document.querySelectorAll('a')
      })

      it('should NOT insert a new link', () => {
        expect(links.length).toBe(1)
      })

      it('should change the link text to the right label', () => {
        expect(links[0].text).toBe('Privacy - CCPA UPDATES')
      })
    })

    describe('if there is no Privacy link in the footer', () => {
      it('should call console.error', async () => {
        const consoleErr = window.console.error
        window.console.error = jest.fn()
        const div = document.createElement('div')
        document.body.appendChild(div)
        mount(<InvalidFooter />, { attachTo: document.querySelector('div') })
        await adaptPrivacyLinkToLegislation()
        expect(window.console.error).toHaveBeenCalled()
        window.console.error = consoleErr
      })
    })
  })
})
