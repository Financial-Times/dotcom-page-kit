/**
 * @jest-environment jsdom
 */

import { withHtml } from '..'

const html = '<html><head></head><body><foo>...</foo></body></html>'

describe('withHtml', () => {
  describe('when called with one arg', () => {
    it('should work as expected', () => {
      const originalHtml = document.documentElement.outerHTML
      withHtml({
        html,
        execute: () => {
          expect(document.documentElement.outerHTML).toBe(html)
        }
      })
      expect(document.documentElement.outerHTML).toBe(originalHtml)
    })
  })

  describe('when called with two args', () => {
    it('should work as expected', () => {
      const originalHtml = document.documentElement.outerHTML
      withHtml(html, () => {
        expect(document.documentElement.outerHTML).toBe(html)
      })
      expect(document.documentElement.outerHTML).toBe(originalHtml)
    })
  })
})
