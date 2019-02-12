const fs = require('fs')
const path = require('path')

const outputFile = path.join(__dirname, '../dist/styles.css')
const outputContents = fs.readFileSync(outputFile).toString()

describe('examples/build-sass', () => {
  it('compiles Sass files to CSS file', () => {
    expect(outputContents).toMatchSnapshot()
  })
})
