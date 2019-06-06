/**
 * @jest-environment jsdom
 */

import { withHtml } from '@financial-times/anvil-test-utils'
import { appContext } from '../../__fixtures__/appContext'
import { prepareEmbedString } from '../prepareEmbedString'
import { loadEmbeddedAppContextData } from '../loadEmbeddedAppContextData'

describe('loadDataFromScriptEmbed()', () => {
  describe('when the app context is embedded in the head via script embed', () => {
    it('returns the embedded app context data', () => {
      withHtml({
        html: `
          <html>
            <head>
              ${prepareEmbedString(appContext)}
            </head>
          </html>
        `,
        execute: () => {
          const result = loadEmbeddedAppContextData()
          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when the app context has been embedded in the body via script embed', () => {
    it('returns the embedded app context data', () => {
      withHtml({
        html: `
          <html>
            <body>
              ${prepareEmbedString(appContext)}
            </body>
          </html>
        `,
        execute: () => {
          const result = loadEmbeddedAppContextData()
          expect(result).toEqual(appContext)
          expect(Object.isFrozen(result)).toBe(true)
        }
      })
    })
  })

  describe('when there is no script embed in the page', () => {
    it('returns undefined when no app context data has been embedded into the page', () => {
      const result = loadEmbeddedAppContextData()
      expect(result).toBe(undefined)
    })
  })
})
