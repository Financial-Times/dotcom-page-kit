import { selectMenuDataForEdition as subject } from '../selectMenuDataForEdition'
import { TNavMenus } from '@financial-times/dotcom-types-navigation'

const fixture = {
  account: {},
  anon: {},
  footer: {},
  'drawer-international': {},
  'drawer-uk': {},
  'navbar-simple': {},
  'navbar-right': {},
  'navbar-right-anon': {},
  'navbar-top-right': {},
  'navbar-top-right-anon': {},
  'navbar-international': {},
  'navbar-uk': {},
  user: {}
} as TNavMenus

describe('dotcom-server-navigation/src/selectMenuDataForEdition', () => {
  it('returns a new object', () => {
    const result = subject(fixture, 'uk')
    expect(result).not.toBe(fixture)
  })

  it('appends shared menus', () => {
    const result = subject(fixture, 'uk')

    expect(result.account).toBe(fixture.account)
    expect(result.footer).toBe(fixture.footer)
    expect(result.user).toBe(fixture.user)
  })

  it('appends edition specific menus', () => {
    const result = subject(fixture, 'uk')

    expect(result.drawer).toBe(fixture['drawer-uk'])
    expect(result.navbar).toBe(fixture['navbar-uk'])
  })
})
