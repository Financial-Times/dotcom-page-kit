/**
 * @jest-environment jsdom
 */

import loadAppContextData from '../loadAppContextData'
import { withHtml } from '@financial-times/anvil-test-utils'
import { appContext } from '../../__fixtures__/appContext'
import { APP_CONTEXT_ELEMENT_ID } from '../../shared/appContext/constants'

describe('loadAppContextData', () => {
  describe('when app context has been embedded via the script tag into the head', () => {
    it('returns a frozen object', () => {
      const appContext = { foo: 1, bar: true, baz: 'qux' }

      withHtml({
        html: `
          <html data-foo="foo">
            <head>
              <script id="${APP_CONTEXT_ELEMENT_ID}">${JSON.stringify(appContext)}</script>
            </head>
          </html>
        `,
        execute: () => {
          const result = loadAppContextData()

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

      withHtml({
        html: `
          <html data-foo="foo">
            <body>
              <script id="${APP_CONTEXT_ELEMENT_ID}">${JSON.stringify(appContext)}</script>
            </body>
          </html>
        `,
        execute: () => {
          const result = loadAppContextData()

          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when the app context has been embedded as html data attributes', () => {
    it('returns a frozen object', () => {
      withHtml({
        html: `
          <html
            data-app-context
            data-next-app="${appContext.appName}"
            data-next-product="${appContext.product}"
            data-next-edition="${appContext.edition}"
            ${appContext.isProduction ? 'data-next-is-production' : ''}
            data-ab-state="${appContext.abTestState}"
            data-next-version="${appContext.appVersion}"
            data-content-id="${appContext.contentId}"
            data-concept-id="${appContext.conceptId}"
            data-taxonomy="${appContext.conceptType}"
            data-publish-reference="${appContext.publishReference}"
            data-content-type="${appContext.contentType}">
            ...
          </html>
        `,
        execute: () => {
          const result = loadAppContextData()

          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when the app context has not been embedded into the page', () => {
    it('returns undefined', () => {
      expect(loadAppContextData()).toEqual(undefined)
    })
  })
})
