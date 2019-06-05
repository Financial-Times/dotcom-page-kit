import { selectMenusForEdition as subject } from '../selectMenusForEdition'
import { TNavMenus } from '@financial-times/anvil-types-navigation'

const fixture = {
  account: {},
  anon: {},
  footer: {},
  'drawer-international': {},
  'drawer-uk': {},
  'navbar-simple': {},
  'navbar-right': {},
  'navbar-right-anon': {},
  'navbar-international': {},
  'navbar-uk': {},
  user: {}
} as TNavMenus

describe('anvil-server-ft-navigation/src/selectMenusForEdition', () => {
  it('returns a new object', () => {
    const result = subject(fixture, 'uk')
    expect(result).not.toBe(fixture)
  })

  it('appends shared menus', () => {
    const result = subject(fixture, 'uk')

    expect(result).toHaveProperty('account', fixture.account)
    expect(result).toHaveProperty('footer', fixture.footer)
    expect(result).toHaveProperty('user', fixture.user)
  })

  it('appends edition specific menus', () => {
    const result = subject(fixture, 'uk')

    expect(result).toHaveProperty('drawer', fixture['drawer-uk'])
    expect(result).toHaveProperty('navbar', fixture['navbar-uk'])
  })
})
