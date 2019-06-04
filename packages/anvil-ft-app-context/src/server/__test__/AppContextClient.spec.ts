import ServerAppContextClient from '../AppContextClient'
import { appContextWithExtras as context } from '../../__fixtures__/appContext'
import { AppContextClient, prepareEmbedString } from '../../shared/appContext'

describe('AppContextClient', () => {
  describe('the instance', () => {
    it('extends the shared app context client', () => {
      const appContext = new ServerAppContextClient()
      expect(appContext).toBeInstanceOf(AppContextClient)
    })
  })

  describe('.data', () => {
    it('returns the app context data', () => {
      const appContext = new ServerAppContextClient({ context })
      expect(appContext.data).toEqual(context)
    })
  })

  describe('.toEmbedString()', () => {
    it('returns the script embed string', () => {
      const appContext = new ServerAppContextClient({ context })
      const embedString = prepareEmbedString(context)
      const result = appContext.toEmbedString()
      expect(result).toBe(embedString)
    })
  })

  describe('.toLegacyDataAttributesString()', () => {
    it('returns a data attributes string that contains the legacy attribute names', () => {
      const appContext = new ServerAppContextClient({ context })
      const legacyAttributesString =
        'data-app-context ' +
        `data-ab-state="${context.abTestState}" ` +
        `data-next-app="${context.appName}" ` +
        `data-next-version="${context.appVersion}" ` +
        `data-bar-prop="${context.barProp}" ` +
        `data-concept-id="${context.conceptId}" ` +
        `data-taxonomy="${context.conceptType}" ` +
        `data-content-id="${context.contentId}" ` +
        `data-content-type="${context.contentType}" ` +
        `data-next-edition="${context.edition}" ` +
        `data-foo-prop="${context.fooProp}" ` +
        'data-next-is-production ' +
        `data-next-product="${context.product}" ` +
        `data-publish-reference="${context.publishReference}"`
      const result = appContext.toLegacyDataAttributesString()
      expect(result).toBe(legacyAttributesString)
    })

    it('ensures that attributes with false values are not outputted', () => {
      const appContext = new ServerAppContextClient({
        context: { ...context, fooFalse: false, fooTrue: true }
      })
      const legacyAttributesString =
        'data-app-context ' +
        `data-ab-state="${context.abTestState}" ` +
        `data-next-app="${context.appName}" ` +
        `data-next-version="${context.appVersion}" ` +
        `data-bar-prop="${context.barProp}" ` +
        `data-concept-id="${context.conceptId}" ` +
        `data-taxonomy="${context.conceptType}" ` +
        `data-content-id="${context.contentId}" ` +
        `data-content-type="${context.contentType}" ` +
        `data-next-edition="${context.edition}" ` +
        `data-foo-prop="${context.fooProp}" ` +
        'data-foo-true ' +
        'data-next-is-production ' +
        `data-next-product="${context.product}" ` +
        `data-publish-reference="${context.publishReference}"`
      const result = appContext.toLegacyDataAttributesString()
      expect(result).toBe(legacyAttributesString)
    })
  })

  describe('.toLegacyDataAttributesObject()', () => {
    it('returns a data attributes object that contains the legacy attribute names', () => {
      const appContext = new ServerAppContextClient({ context })
      const legacyAttributesObject = {
        dataAppContext: true,
        dataAbState: context.abTestState,
        dataNextApp: context.appName,
        dataBarProp: context.barProp,
        dataFooProp: context.fooProp,
        dataTaxonomy: context.conceptType,
        dataConceptId: context.conceptId,
        dataContentId: context.contentId,
        dataContentType: context.contentType,
        dataNextEdition: context.edition,
        dataNextProduct: context.product,
        dataNextVersion: context.appVersion,
        dataNextIsProduction: true,
        dataPublishReference: context.publishReference
      }
      const result = appContext.toLegacyDataAttributesObject()
      expect(result).toEqual(legacyAttributesObject)
    })
  })

  describe('.add({...})', () => {
    it('adds properties unto the app context', () => {
      const appContext = new ServerAppContextClient({ context })
      const additionalContext = { foo: 'one', bar: 'two', contentId: '12345' }
      appContext.add(additionalContext)
      expect(appContext.data).toEqual({ ...context, ...additionalContext })
    })
  })

  describe(".get('item')", () => {
    it('returns the value of the equivalent app context property', () => {
      const appContext = new ServerAppContextClient({ context })
      const result = appContext.get('appVersion')
      expect(result).toBe(context.appVersion)
    })
  })
})
