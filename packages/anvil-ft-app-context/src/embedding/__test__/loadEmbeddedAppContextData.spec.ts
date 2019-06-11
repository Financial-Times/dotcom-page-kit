/**
 * @jest-environment jsdom
 */

import * as libOne from '../loadDataFromScriptEmbed'
import * as libTwo from '../loadDataFromAttributesEmbed'
import { withHtml } from '@financial-times/anvil-test-utils'
import { prepareEmbedString } from '../prepareEmbedString'
import { loadDataFromScriptEmbed } from '../loadDataFromScriptEmbed'
import { loadEmbeddedAppContextData } from '../loadEmbeddedAppContextData'
import { loadDataFromAttributesEmbed } from '../loadDataFromAttributesEmbed'
import { appContext, legacyAttributesHtml } from '../../__fixtures__/appContext'

describe('loadEmbeddedAppContextData', () => {
  beforeEach(() => jest.resetAllMocks())

  describe('@unit', () => {
    describe('when app context has been embedded via the script tag', () => {
      it('delegates to the `loadDataFromScriptEmbed()` function to retrieve the app context data', () => {
        const context = { foo: 'bar' }

        mock({
          object: libOne,
          method: loadDataFromScriptEmbed,
          returnValue: context
        })

        const result = loadEmbeddedAppContextData()
        expect(loadDataFromScriptEmbed).toHaveBeenCalledTimes(1)
        expect(result).toEqual(context)
      })
    })

    describe('when the app context has been embedded as html data attributes', () => {
      it('delegates to the `loadDataFromAttributesEmbed()` function to retrieve the app context', () => {
        const context = { foo: ':bar:' }

        mock({
          object: libTwo,
          method: loadDataFromAttributesEmbed,
          returnValue: context
        })

        const result = loadDataFromAttributesEmbed()
        expect(loadDataFromAttributesEmbed).toHaveBeenCalledTimes(1)
        expect(result).toEqual(context)
      })
    })
  })

  describe('@integration', () => {
    beforeAll(() => jest.restoreAllMocks())

    describe('when app context has been embedded via the script tag', () => {
      it('returns a frozen app context data instance', () => {
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

    describe('when the app context has been embedded as html data attributes', () => {
      it('returns a frozen app context data instance', () => {
        withHtml({
          html: legacyAttributesHtml(),
          execute: () => {
            const result = loadEmbeddedAppContextData()
            expect(result).toEqual(appContext)
            expect(Object.isFrozen(result)).toBe(true)
          }
        })
      })
    })

    describe('when the app context has not been embedded into the page', () => {
      it('returns undefined', () => {
        expect(loadEmbeddedAppContextData()).toEqual(undefined)
      })
    })
  })
})

function mock({ object, method, returnValue }) {
  const mocked = jest.spyOn(object, method.name)

  if (returnValue) {
    mocked.mockReturnValue(returnValue)
  }

  return mocked
}
