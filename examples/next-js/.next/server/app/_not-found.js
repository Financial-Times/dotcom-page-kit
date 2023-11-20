'use strict'
;(() => {
  var e = {}
  ;(e.id = 165),
    (e.ids = [165]),
    (e.modules = {
      2934: (e) => {
        e.exports = require('next/dist/client/components/action-async-storage.external.js')
      },
      5403: (e) => {
        e.exports = require('next/dist/client/components/request-async-storage.external')
      },
      4580: (e) => {
        e.exports = require('next/dist/client/components/request-async-storage.external.js')
      },
      4749: (e) => {
        e.exports = require('next/dist/client/components/static-generation-async-storage.external')
      },
      5869: (e) => {
        e.exports = require('next/dist/client/components/static-generation-async-storage.external.js')
      },
      399: (e) => {
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js')
      },
      9491: (e) => {
        e.exports = require('assert')
      },
      4300: (e) => {
        e.exports = require('buffer')
      },
      2361: (e) => {
        e.exports = require('events')
      },
      7147: (e) => {
        e.exports = require('fs')
      },
      3685: (e) => {
        e.exports = require('http')
      },
      5687: (e) => {
        e.exports = require('https')
      },
      8188: (e) => {
        e.exports = require('module')
      },
      6005: (e) => {
        e.exports = require('node:crypto')
      },
      9411: (e) => {
        e.exports = require('node:path')
      },
      2037: (e) => {
        e.exports = require('os')
      },
      1017: (e) => {
        e.exports = require('path')
      },
      5477: (e) => {
        e.exports = require('punycode')
      },
      2781: (e) => {
        e.exports = require('stream')
      },
      1576: (e) => {
        e.exports = require('string_decoder')
      },
      6224: (e) => {
        e.exports = require('tty')
      },
      7310: (e) => {
        e.exports = require('url')
      },
      3837: (e) => {
        e.exports = require('util')
      },
      1267: (e) => {
        e.exports = require('worker_threads')
      },
      9796: (e) => {
        e.exports = require('zlib')
      },
      6924: (e, r, t) => {
        t.r(r),
          t.d(r, {
            GlobalError: () => i.a,
            __next_app__: () => d,
            originalPathname: () => x,
            pages: () => l,
            routeModule: () => c,
            tree: () => u
          })
        var o = t(6965),
          n = t(4902),
          s = t(6408),
          i = t.n(s),
          a = t(4346),
          p = {}
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
            ].indexOf(e) && (p[e] = () => a[e])
        t.d(r, p)
        let u = [
            '',
            {
              children: [
                '__PAGE__',
                {},
                {
                  page: [
                    () => Promise.resolve().then(t.t.bind(t, 5438, 23)),
                    'next/dist/client/components/not-found-error'
                  ]
                }
              ]
            },
            {
              layout: [
                () => Promise.resolve().then(t.bind(t, 1252)),
                '/Users/benwallman/Documents/repos/financial-times/dotcom-page-kit/examples/next-js/app/layout.tsx'
              ],
              'not-found': [
                () => Promise.resolve().then(t.t.bind(t, 5438, 23)),
                'next/dist/client/components/not-found-error'
              ]
            }
          ],
          l = [],
          x = '/_not-found',
          d = { require: t, loadChunk: () => Promise.resolve() },
          c = new o.AppPageRouteModule({
            definition: {
              kind: n.x.APP_PAGE,
              page: '/_not-found',
              pathname: '/_not-found',
              bundlePath: '',
              filename: '',
              appPaths: []
            },
            userland: { loaderTree: u }
          })
      }
    })
  var r = require('../webpack-runtime.js')
  r.C(e)
  var t = (e) => r((r.s = e)),
    o = r.X(0, [253, 827], () => t(6924))
  module.exports = o
})()
