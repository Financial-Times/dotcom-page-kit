describe('examples/dynamic-imports', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })

  it('responds to button click by adding an image to DOM via dynamically imported module', async () => {
    expect(await page.title()).toBe('Dynamically-loaded dogs | Good Dogs')

    expect(await pageDescription()).toBe('Dynamically-loaded dogs')

    expect(await getTotalImages()).toBe(0)

    await page.click('#button')

    await page.waitForSelector("img[data-component='image']")

    expect(await getTotalImages()).toBe(1)
  })
})

async function getTotalImages() {
  return page.evaluate(async () => {
    return document.querySelectorAll('img').length
  })
}

function pageDescription() {
  return page.$eval("head > meta[name='description']", (element) => element.content)
}
