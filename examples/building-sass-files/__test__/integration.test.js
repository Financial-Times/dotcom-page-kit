const fs = require('fs')
const path = require('path')

const outputFile = path.join(__dirname, '../dist/styles.css')
const outputContents = fs.readFileSync(outputFile).toString()

describe('examples/building-sass-files', () => {
  it('does not output any JS files', () => {
    const targetFile = path.join(__dirname, '../dist/styles.js')
    expect(fs.existsSync(targetFile)).toBe(false)
  })

  describe('Sass', () => {
    it('can load partials from packages installed with npm', () => {
      // Styles should be defined by the o-normalise package
      expect(outputContents).toContain('.o-normalise-visually-hidden')
    })
  })

  describe('PostCSS', () => {
    it('uses Autoprefixer to apply vendor prefixes', () => {
      expect(outputContents).toContain('-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto')
    })

    it('uses cssnano to minify the output', () => {
      const result = outputContents.match(/\.selector/g)
      expect(result.length).toBe(1)
    })
  })
})
