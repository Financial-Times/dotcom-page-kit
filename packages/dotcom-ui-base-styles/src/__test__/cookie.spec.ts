import cookieStore from '../lib/cookies'

describe('Cookie Util', () => {
  const testCookieName = 'testCookie'
  const testCookieValue = 'test'

  afterEach(() => {
    cookieStore.remove(testCookieName)
  })

  it('Should be able to set a cookie value', () => {
    cookieStore.set(testCookieName, testCookieValue, { maxAge: 1000 })
    let cookie = document.cookie.replace(cookieStore.getRegexForName(testCookieName), '$1')
    expect(cookie).toEqual(testCookieValue)
  })

  it('Should be able to get a cookie value', () => {
    cookieStore.set(testCookieName, testCookieValue, { maxAge: 1000 })
    const value = cookieStore.get(testCookieName)
    expect(value).toEqual(testCookieValue)
  })

  it('Should be able to test for the existence of a cookie', () => {
    cookieStore.set(testCookieName, testCookieValue, { maxAge: 1000 })
    const result = cookieStore.has(testCookieName)
    expect(result).toBe(true)
  })

  it('Should be able to delete a cookie by setting the expiry to the past', () => {
    cookieStore.set(testCookieName, testCookieValue, { maxAge: 1000 })
    cookieStore.remove(testCookieName)
    expect(cookieStore.has(testCookieName)).toBe(false)
  })

  it('Should url encode (and unencode) names and values', () => {
    const name = '&name'
    const value = 'val:ue'
    cookieStore.set(name, value)
    expect(cookieStore.has(name)).toBe(true)
    expect(cookieStore.get(name)).toEqual(value)
  })
})
