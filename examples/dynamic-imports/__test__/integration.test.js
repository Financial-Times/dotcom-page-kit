describe('examples/dynamic-imports', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })

  it('responds to button click by adding a div to DOM via dynamically imported module', async () => {
    expect(await page.title()).toBe('Dynamically-loaded dogs | Good Dogs')

    expect(await pageDescription()).toBe('Dynamically-loaded dogs')

    expect(await getTotalDivs()).toBe(0)

    await page.click('#button')

    await page.waitForSelector("div[data-component='dog-emoji']")

    expect(await getTotalDivs()).toBe(1)
  })
})

function getTotalDivs() {
  return page.evaluate(() => document.querySelectorAll('div').length)
}

function pageDescription() {
  return page.$eval("head > meta[name='description']", (element) => element.content)
}
