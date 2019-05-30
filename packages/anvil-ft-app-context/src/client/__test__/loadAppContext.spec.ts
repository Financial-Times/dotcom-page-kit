/**
 * @jest-environment jsdom
 */

import withDomOverwrites from 'with-dom-overwrites'
import { appContext } from '../../__fixtures__/appContext'
import { loadAppContext } from '../loadAppContext'
import { APP_CONTEXT_ELEMENT_ID } from '../../shared/constants'

describe('loadAppContext', () => {
  describe('when app context has been embedded via the script tag into the head', () => {
    it('returns a frozen object', () => {
      const appContext = { foo: 1, bar: true, baz: 'qux' }

      withDomOverwrites({
        overwrites: {
          'document.documentElement.outerHTML': `
            <html data-foo="foo">
              <head>
                <script id="${APP_CONTEXT_ELEMENT_ID}">${JSON.stringify(appContext)}</script>
              </head>
            </html>
          `
        },
        run: () => {
          const result = loadAppContext()

          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when the app context has been embedded via the script tag into the body', () => {
    // The aim here is to verify that the app context will be found
    // regardless of where it is within the html

    it('returns a frozen object', () => {
      const appContext = { foo: 1, bar: true }

      withDomOverwrites({
        overwrites: {
          'document.documentElement.outerHTML': `
          <html data-foo="foo">
            <body>
              <script id="${APP_CONTEXT_ELEMENT_ID}">${JSON.stringify(appContext)}</script>
            </body>
          </html>
        `
        },
        run: () => {
          const result = loadAppContext()

          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when the app context has been embedded as html data attributes', () => {
    it('returns a frozen object', () => {
      withDomOverwrites({
        overwrites: {
          'document.documentElement.outerHTML': `
          <html
            data-app-context
            data-next-app="article"
            data-next-product="next"
            data-next-edition="uk"
            data-next-is-production
            data-ab-state="subscriberCohort:on,premiumCohort:on,nonUSACohort:on"
            data-next-version="882797258625531f20d604f6441ef8cfcb2d772b"
            data-content-id="c5935758-7730-11e9-bbad-7c18c0ea0201"
            data-publish-reference="tid_17wmwszvk3"
            data-content-type="article">
              ...
            </html>
          `
        },
        run: () => {
          const result = loadAppContext()

          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when the app context has not been embedded into the page', () => {
    it('returns undefined', () => {
      expect(loadAppContext()).toEqual(undefined)
    })
  })
})
