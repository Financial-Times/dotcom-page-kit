import { AppContext } from '../../server/AppContext'
import { prepareEmbedString } from '../../shared/prepareEmbedString'
import { appContextWithExtras as context } from '../../__fixtures__/appContext'

describe('AppContext', () => {
  describe('.data', () => {
    it('returns the app context data', () => {
      const appContext = new AppContext({ context })
      expect(appContext.data).toEqual(context)
    })
  })

  describe('.toEmbedString()', () => {
    it('returns the script embed string', () => {
      const appContext = new AppContext({ context })
      const embedString = prepareEmbedString(context)
      const result = appContext.toEmbedString()
      expect(result).toBe(embedString)
    })
  })

  describe('.toLegacyDataAttributesString()', () => {
    it('returns a data attributes string that contains the legacy attribute names', () => {
      const appContext = new AppContext({ context })
      const legacyAttributesString =
        'data-app-context ' +
        `data-ab-state="${context.abState}" ` +
        `data-next-app="${context.app}" ` +
        `data-bar-prop="${context.barProp}" ` +
        `data-content-id="${context.contentId}" ` +
        `data-content-type="${context.contentType}" ` +
        `data-next-edition="${context.edition}" ` +
        `data-foo-prop="${context.fooProp}" ` +
        'data-next-is-production ' +
        `data-next-product="${context.product}" ` +
        `data-publish-reference="${context.publishReference}" ` +
        `data-next-version="${context.version}"`
      const result = appContext.toLegacyDataAttributesString()
      expect(result).toBe(legacyAttributesString)
    })

    it('ensures that attributes with false values are not outputted', () => {
      const appContext = new AppContext({ context: { ...context, fooFalse: false, fooTrue: true } })
      const legacyAttributesString =
        'data-app-context ' +
        `data-ab-state="${context.abState}" ` +
        `data-next-app="${context.app}" ` +
        `data-bar-prop="${context.barProp}" ` +
        `data-content-id="${context.contentId}" ` +
        `data-content-type="${context.contentType}" ` +
        `data-next-edition="${context.edition}" ` +
        `data-foo-prop="${context.fooProp}" ` +
        'data-foo-true ' +
        'data-next-is-production ' +
        `data-next-product="${context.product}" ` +
        `data-publish-reference="${context.publishReference}" ` +
        `data-next-version="${context.version}"`
      const result = appContext.toLegacyDataAttributesString()
      expect(result).toBe(legacyAttributesString)
    })
  })

  describe('.toLegacyDataAttributesObject()', () => {
    it('returns a data attributes object that contains the legacy attribute names', () => {
      const appContext = new AppContext({ context })
      const legacyAttributesObject = {
        dataAppContext: true,
        dataAbState: context.abState,
        dataNextApp: context.app,
        dataBarProp: context.barProp,
        dataFooProp: context.fooProp,
        dataContentId: context.contentId,
        dataContentType: context.contentType,
        dataNextEdition: context.edition,
        dataNextProduct: context.product,
        dataNextVersion: context.version,
        dataNextIsProduction: true,
        dataPublishReference: context.publishReference
      }
      const result = appContext.toLegacyDataAttributesObject()
      expect(result).toEqual(legacyAttributesObject)
    })
  })

  describe('.add({...})', () => {
    it('adds properties unto the app context', () => {
      const appContext = new AppContext({ context })
      const additionalContext = { foo: 'one', bar: 'two', contentId: '12345' }
      appContext.add(additionalContext)
      expect(appContext.data).toEqual({ ...context, ...additionalContext })
    })
  })

  describe(".get('item')", () => {
    it('returns the value of the equivalent app context property', () => {
      const appContext = new AppContext({ context })
      const result = appContext.get('version')
      expect(result).toBe(context.version)
    })
  })
})
