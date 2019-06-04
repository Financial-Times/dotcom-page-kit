const app = require('../server/app')
const request = require('supertest')
const { withEnv, withHtml } = require('@financial-times/anvil-test-utils')
const { loadFromScriptEmbed, loadFromDataAttributesEmbed } = require('@financial-times/anvil-ft-app-context')

describe('examples/express-ft-header', () => {
  let response

  beforeEach(async () => {
    response = await request(app).get('/')
  })

  it('returns an OK response', () => {
    expect(response.statusCode).toBe(200)
  })

  it('renders the Financial Times Header Logo as a link', () => {
    expect(response.text).toContain('data-trackable="logo" href="/"')
  })

  it('renders the header top components; search, menu and myFT', () => {
    expect(response.text).toContain('data-trackable="search-toggle">')
    expect(response.text).toContain('data-trackable="drawer-toggle"')
    expect(response.text).toContain('href="/myft" data-trackable="my-ft"')
  })

  it('populates navigation elements with navigation data', () => {
    expect(response.text).toContain('data-trackable="Home"')
    expect(response.text).toContain('data-trackable="World"')
    expect(response.text).toContain('data-trackable="Markets"')
  })

  it('populates drawer elements with navigation data', () => {
    expect(response.text).toContain('o-header__drawer-menu--primary')
    expect(response.text).toContain('o-header__drawer-menu--user')
    expect(response.text).toContain('o-header__drawer-current-edition')
    expect(response.text).toContain('data-trackable="edition-switcher"')
  })

  it('populates meganav elements with navigation data', () => {
    expect(response.text).toContain('data-trackable="meganav | World"')
    expect(response.text).toContain('data-trackable="meganav | Markets"')
    expect(response.text).toContain('data-trackable="meganav | Opinion"')
    expect(response.text).toContain('o-header__mega-heading')
    expect(response.text).toContain('o-header__mega-content')
    expect(response.text).toContain('o-header__mega-item')
  })

  describe('app context', () => {
    const appContext = {
      product: 'next',
      edition: 'edition:foo',
      abTestState: 'state:foo',
      appVersion: 'foo:version',
      isProduction: true
    }

    beforeEach(async () => {
      await withEnv({
        env: {
          NODE_ENV: 'production',
          SOURCE_VERSION: appContext.appVersion
        },
        execute: async () => {
          response = await request(app)
            .get('/')
            .set('ft-ab', appContext.abTestState)
            .set('ft-edition', appContext.edition)
        }
      })
    })

    it('embeds app context data as legacy data attributes on the html tag', () => {
      withHtml(response.text, () => {
        const result = loadFromDataAttributesEmbed()
        expect(result).toEqual(appContext)
      })
    })

    it('embed app context data as a script embed', () => {
      withHtml(response.text, () => {
        const result = loadFromScriptEmbed()
        expect(result).toEqual(appContext)
      })
    })
  })
})
