const element = {
  nav: {
    homepageLink: '#homepageNavLink',
    dogsPageLink: '#dogsPageNavLink'
  }
}

describe('examples/dynamic-imports', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })

  it('dynamically imports component by navigating to another page via client-side routing', async () => {
    expect(await page.title()).toBe('Home | Page Kit')
    expect(await pageDescription()).toBe('The homepage')

    await page.click(element.nav.dogsPageLink)

    expect(await page.title()).toBe('Dogs | Page Kit')
    expect(await pageDescription()).toBe('The dogs page')
  })
})

function pageDescription() {
  return page.$eval("head > meta[name='description']", (element) => element.content)
}
