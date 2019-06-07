const BUILD_NODE = 'npm run tsc -- --module commonjs --outDir ./dist/node'
const BUILD_BROWSER = 'npm run tsc -- --module es2015 --outDir ./dist/browser'

const fs = require('fs')
const path = require('path')

const target = path.resolve('./package.json')
const pkg = require(target)

const isNode = pkg.scripts['build:node'] || pkg.scripts['build:cjs']
const isBrowser = pkg.scripts['build:browser'] || pkg.scripts['build:esm']

if (isNode) {
  pkg.scripts['build:cjs'] = undefined
  pkg.scripts['build:node'] = BUILD_NODE

  if (/\/cjs/.test(pkg.main)) {
    pkg.main = pkg.main.replace('/cjs', '/node')
  }
}

if (isBrowser) {
  pkg.scripts['build:esm'] = undefined
  pkg.scripts['build:browser'] = BUILD_BROWSER

  if (/\/esm/.test(pkg.main)) {
    pkg.main = pkg.main.replace('/esm', '/browser')
  }
}

if (isNode && isBrowser) {
  pkg.scripts.build = 'npm run build:node && npm run build:browser'
  pkg.scripts.dev = "echo -n node browser | parallel -u -d ' ' npm run build:{} -- --watch"
} else if (isNode) {
  pkg.scripts.build = 'npm run build:node'
  pkg.scripts.dev = 'npm run build:node -- --watch'
} else if (isBrowser) {
  pkg.scripts.build = 'npm run build:browser'
  pkg.scripts.dev = 'npm run build:browser -- --watch'
}

fs.writeFileSync(target, JSON.stringify(pkg, null, 2) + '\n')
