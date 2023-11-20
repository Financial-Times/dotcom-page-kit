;(() => {
  var e = {}
  ;(e.id = 931),
    (e.ids = [931]),
    (e.modules = {
      2934: (e) => {
        'use strict'
        e.exports = require('next/dist/client/components/action-async-storage.external.js')
      },
      5403: (e) => {
        'use strict'
        e.exports = require('next/dist/client/components/request-async-storage.external')
      },
      4580: (e) => {
        'use strict'
        e.exports = require('next/dist/client/components/request-async-storage.external.js')
      },
      4749: (e) => {
        'use strict'
        e.exports = require('next/dist/client/components/static-generation-async-storage.external')
      },
      5869: (e) => {
        'use strict'
        e.exports = require('next/dist/client/components/static-generation-async-storage.external.js')
      },
      399: (e) => {
        'use strict'
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js')
      },
      9491: (e) => {
        'use strict'
        e.exports = require('assert')
      },
      4300: (e) => {
        'use strict'
        e.exports = require('buffer')
      },
      2361: (e) => {
        'use strict'
        e.exports = require('events')
      },
      7147: (e) => {
        'use strict'
        e.exports = require('fs')
      },
      3685: (e) => {
        'use strict'
        e.exports = require('http')
      },
      5687: (e) => {
        'use strict'
        e.exports = require('https')
      },
      8188: (e) => {
        'use strict'
        e.exports = require('module')
      },
      6005: (e) => {
        'use strict'
        e.exports = require('node:crypto')
      },
      9411: (e) => {
        'use strict'
        e.exports = require('node:path')
      },
      2037: (e) => {
        'use strict'
        e.exports = require('os')
      },
      1017: (e) => {
        'use strict'
        e.exports = require('path')
      },
      5477: (e) => {
        'use strict'
        e.exports = require('punycode')
      },
      2781: (e) => {
        'use strict'
        e.exports = require('stream')
      },
      1576: (e) => {
        'use strict'
        e.exports = require('string_decoder')
      },
      6224: (e) => {
        'use strict'
        e.exports = require('tty')
      },
      7310: (e) => {
        'use strict'
        e.exports = require('url')
      },
      3837: (e) => {
        'use strict'
        e.exports = require('util')
      },
      1267: (e) => {
        'use strict'
        e.exports = require('worker_threads')
      },
      9796: (e) => {
        'use strict'
        e.exports = require('zlib')
      },
      1739: (e, t, r) => {
        'use strict'
        r.r(t),
          r.d(t, {
            GlobalError: () => n.a,
            __next_app__: () => x,
            originalPathname: () => l,
            pages: () => c,
            routeModule: () => d,
            tree: () => p
          })
        var s = r(6965),
          i = r(4902),
          o = r(6408),
          n = r.n(o),
          a = r(4346),
          u = {}
        for (let e in a)
          0 >
            [
              'default',
              'tree',
              'pages',
              'GlobalError',
              'originalPathname',
              '__next_app__',
              'routeModule'
            ].indexOf(e) && (u[e] = () => a[e])
        r.d(t, u)
        let p = [
            '',
            {
              children: [
                '__PAGE__',
                {},
                {
                  page: [
                    () => Promise.resolve().then(r.bind(r, 776)),
                    '/Users/benwallman/Documents/repos/financial-times/dotcom-page-kit/examples/next-js/app/page.tsx'
                  ]
                }
              ]
            },
            {
              layout: [
                () => Promise.resolve().then(r.bind(r, 1252)),
                '/Users/benwallman/Documents/repos/financial-times/dotcom-page-kit/examples/next-js/app/layout.tsx'
              ],
              'not-found': [
                () => Promise.resolve().then(r.t.bind(r, 5438, 23)),
                'next/dist/client/components/not-found-error'
              ]
            }
          ],
          c = [
            '/Users/benwallman/Documents/repos/financial-times/dotcom-page-kit/examples/next-js/app/page.tsx'
          ],
          l = '/page',
          x = { require: r, loadChunk: () => Promise.resolve() },
          d = new s.AppPageRouteModule({
            definition: {
              kind: i.x.APP_PAGE,
              page: '/page',
              pathname: '/',
              bundlePath: '',
              filename: '',
              appPaths: []
            },
            userland: { loaderTree: p }
          })
      },
      3245: () => {},
      776: (e, t, r) => {
        'use strict'
        r.r(t), r.d(t, { default: () => i })
        var s = r(5620)
        r(9521)
        let i = () =>
          s.jsx('article', {
            style: {
              display: 'flex',
              flex: '1 1 100%',
              justifyContent: 'center',
              paddingTop: '200px',
              paddingBottom: '200px'
            },
            children: s.jsx('section', { children: s.jsx('p', { children: 'Hello World' }) })
          })
      }
    })
  var t = require('../webpack-runtime.js')
  t.C(e)
  var r = (e) => t((t.s = e)),
    s = t.X(0, [253, 827], () => r(1739))
  module.exports = s
})()
