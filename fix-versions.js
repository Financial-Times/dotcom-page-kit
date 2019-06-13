const fs = require('fs')
const path = require('path')

// Fix pkg version
const pkgPath = path.resolve('package.json')
const pkg = require(pkgPath)

pkg.version = '0.0.0'

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

// Fix .npmignore
const npmignorePath = path.resolve('.npmignore')

const ignore = `
__fixtures__/
__stories__/
__test__/
tsconfig.json
*.tsbuildinfo
`

fs.writeFileSync(npmignorePath, ignore.trim() + '\n')
