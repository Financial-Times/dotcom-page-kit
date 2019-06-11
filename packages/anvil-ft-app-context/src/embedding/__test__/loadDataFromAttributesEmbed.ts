import { withHtml } from '@financial-times/anvil-test-utils'
import { appContext, legacyAttributesHtml } from '../../__fixtures__/appContext'
import { loadDataFromAttributesEmbed } from '../loadDataFromAttributesEmbed'

describe('loadDataFromAttributesEmbed()', () => {
  it('loads the app context data that has been embedded as legacy attributes', () => {
    withHtml({
      html: legacyAttributesHtml(),
      execute: () => {
        const result = loadDataFromAttributesEmbed()
        expect(result).toEqual(appContext)
        expect(Object.isFrozen(result)).toBe(true)
      }
    })
  })

  it('returns undefined when there is no `data-app-context` attribute', () => {
    withHtml({
      html: legacyAttributesHtml({
        withDataAppContextAttribute: false
      }),
      execute: () => {
        const result = loadDataFromAttributesEmbed()
        expect(result).toBe(undefined)
      }
    })
  })
})
