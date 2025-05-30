const fs = require('fs')
const path = require('path')

const outputFile = path.join(__dirname, '../public/styles.css')
const outputContents = fs.readFileSync(outputFile).toString()

describe('examples/building-sass-files', () => {
  it('does not output any JS files', () => {
    const targetFile = path.join(__dirname, '../public/styles.js')
    expect(fs.existsSync(targetFile)).toBe(false)
  })

  describe('Sass', () => {
    it('can load partials from packages installed with npm', () => {
      // Styles should be defined by the o-normalise package
      expect(outputContents).toContain('.o3-visually-hidden')
    })
    it('can prepend data to the output', () => {
      expect(outputContents).toContain('.prepended-flag-exists')
    })
  })

  describe('Optimisation', () => {
    it('uses cssnano to minify the output', () => {
      const result = outputContents.match(/\.selector/g)
      expect(result.length).toBe(1)
    })
  })
})
