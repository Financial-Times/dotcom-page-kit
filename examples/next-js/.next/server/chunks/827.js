;(exports.id = 827),
  (exports.ids = [827]),
  (exports.modules = {
    250: (e) => {
      function a(e) {
        var a = Error("Cannot find module '" + e + "'")
        throw ((a.code = 'MODULE_NOT_FOUND'), a)
      }
      ;(a.keys = () => []), (a.resolve = a), (a.id = 250), (e.exports = a)
    },
    6703: () => {},
    8733: (e, a, t) => {
      Promise.resolve().then(t.t.bind(t, 6599, 23)),
        Promise.resolve().then(t.t.bind(t, 8595, 23)),
        Promise.resolve().then(t.t.bind(t, 5762, 23)),
        Promise.resolve().then(t.t.bind(t, 879, 23)),
        Promise.resolve().then(t.t.bind(t, 8054, 23)),
        Promise.resolve().then(t.t.bind(t, 4843, 23))
    },
    1252: (e, a, t) => {
      'use strict'
      t.r(a), t.d(a, { default: () => h, metadata: () => m })
      var Headers,
        l,
        r = t(5620)
      t(9521)
      var n = t(137),
        o = t(2318)
      function i(e) {
        let { children: a, ...t } = e
        return a
          ? 'string' == typeof a
            ? r.jsx('div', { ...t, dangerouslySetInnerHTML: { __html: a } })
            : r.jsx('div', { ...t, children: a })
          : null
      }
      function d({
        navigationData: e,
        headerOptions: a,
        headerBefore: t,
        headerVariant: o,
        headerComponent: d,
        headerAfter: s,
        footerOptions: c,
        footerBefore: u,
        footerVariant: m,
        footerComponent: h,
        footerAfter: f,
        children: _,
        contents: b
      }) {
        let v = null,
          p = null
        if (o && Headers[o] && !d) {
          let t = Headers[o]
          ;(v = r.jsx(t, { ...a, data: e, variant: o })),
            (t === n.Header || t === n.Header) && (p = r.jsx(n.Drawer, { ...a, data: e }))
        }
        let g = null
        if (m && l[m] && !h) {
          let a = l[m]
          g = r.jsx(a, { ...c, data: e, variant: m })
        }
        return (0, r.jsxs)('div', {
          className: 'n-layout',
          children: [
            r.jsx('a', {
              'data-trackable': 'a11y-skip-to-help',
              className: 'n-layout__skip-link',
              href: 'https://www.ft.com/accessibility',
              children: 'Accessibility help'
            }),
            p
              ? r.jsx('a', {
                  'data-trackable': 'a11y-skip-to-navigation',
                  className: 'n-layout__skip-link',
                  href: '#site-navigation',
                  children: 'Skip to navigation'
                })
              : null,
            r.jsx('a', {
              'data-trackable': 'a11y-skip-to-content',
              className: 'n-layout__skip-link',
              href: '#site-content',
              children: 'Skip to content'
            }),
            g
              ? r.jsx('a', {
                  'data-trackable': 'a11y-skip-to-footer',
                  className: 'n-layout__skip-link',
                  href: '#site-footer',
                  children: 'Skip to footer'
                })
              : null,
            (0, r.jsxs)('div', {
              className: 'n-layout__row n-layout__row--header',
              children: [
                r.jsx(i, { className: 'n-layout__header-before', children: t }),
                d || v || null,
                r.jsx(i, { className: 'n-layout__header-after', children: s })
              ]
            }),
            r.jsx('div', {
              className: 'n-layout__row n-layout__row--content',
              children: r.jsx(i, { children: b || _ })
            }),
            (0, r.jsxs)('div', {
              className: 'n-layout__row n-layout__row--footer',
              children: [
                r.jsx(i, { className: 'n-layout__footer-before', children: u }),
                h || g || null,
                r.jsx(i, { className: 'n-layout__footer-after', children: f })
              ]
            }),
            p
          ]
        })
      }
      ;(function (Headers) {
        ;(Headers[(Headers.simple = n.Header)] = 'simple'),
          (Headers[(Headers['large-logo'] = n.Header)] = 'large-logo'),
          (Headers[(Headers['logo-only'] = n.LogoOnly)] = 'logo-only'),
          (Headers[(Headers['no-outbound-links'] = n.NoOutboundLinksHeader)] = 'no-outbound-links')
      })(Headers || (Headers = {})),
        (function (e) {
          ;(e[(e.simple = o.Footer)] = 'simple'), (e[(e.legal = o.LegalFooter)] = 'legal')
        })(l || (l = {})),
        (d.defaultProps = {
          headerVariant: 'simple',
          footerVariant: 'simple',
          headerOptions: {},
          footerOptions: {}
        }),
        t(9712)
      var s = t(2978)
      t(1450)
      var c = t(7197)
      let u = async (e) => {
          let a = new c.Navigation({}),
            t = a.getSubscribeAction(),
            l = await a.getMenusFor(e, 'uk'),
            r = a.getEditionsFor('uk'),
            n = { editions: r, subscribeAction: t, currentPath: e, ...l }
          return n
        },
        m = { title: 'Financial Times', description: 'Example Next.js app with FT branding' }
      async function h({ children: e }) {
        let a = await u('foo')
        return r.jsx('html', {
          className: 'js enhanced',
          'data-o-component': 'o-typography',
          style: s.documentStyles,
          children: r.jsx('body', {
            children: r.jsx(d, { navigationData: a, headerBefore: r.jsx('div', {}), children: e })
          })
        })
      }
    },
    3599: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.getSubscribeAction = void 0),
        (a.getSubscribeAction = function () {
          return {
            id: 'subscribe',
            name: 'Subscribe for full access',
            url: '/products?segmentId=4526c036-7527-ab37-9a29-0b0403fa0b5f'
          }
        })
    },
    7582: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.decorateMenuData = void 0)
      let t = (e, a) => e === a,
        l = (e) => e.hasOwnProperty('label') && e.hasOwnProperty('url'),
        r = (e, a) => {
          if (e && e.includes('${currentPath}')) {
            let t = !/\/(products|barriers|errors)/.test(a),
              l = t ? a : '%2F'
            return e.replace('${currentPath}', l)
          }
          return e
        },
        n = (e, a) => {
          ;(e.url = r(e.url, a)), (e.selected = t(e.url, a))
        }
      a.decorateMenuData = function (e, a) {
        return (function e(a, t) {
          if (Array.isArray(a)) return a.map((a) => e(a, t))
          if (Object(a) === a) {
            let r = {}
            for (let l of Object.keys(a)) r[l] = e(a[l], t)
            return l(r) && n(r, t), r
          }
          return a
        })(e, a)
      }
    },
    2649: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.getEditions = a.isEdition = void 0)
      let t = [
          { id: 'uk', name: 'UK', url: '/' },
          { id: 'international', name: 'International', url: '/' }
        ],
        l = t.map((e) => e.id)
      ;(a.isEdition = function (e) {
        return l.includes(e)
      }),
        (a.getEditions = function (e) {
          return { current: t.find((a) => a.id === e), others: t.filter((a) => a.id !== e) }
        })
    },
    7197: (e, a, t) => {
      'use strict'
      var l = Object.create
          ? function (e, a, t, l) {
              void 0 === l && (l = t),
                Object.defineProperty(e, l, {
                  enumerable: !0,
                  get: function () {
                    return a[t]
                  }
                })
            }
          : function (e, a, t, l) {
              void 0 === l && (l = t), (e[l] = a[t])
            },
        r = function (e, a) {
          for (var t in e) 'default' === t || Object.prototype.hasOwnProperty.call(a, t) || l(a, e, t)
        }
      Object.defineProperty(a, '__esModule', { value: !0 }), r(t(2649), a), r(t(3599), a), r(t(1623), a)
    },
    1623: (e, a, t) => {
      'use strict'
      var l = function (e) {
        return e && e.__esModule ? e : { default: e }
      }
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.Navigation = void 0)
      let r = l(t(7931)),
        n = l(t(8039)),
        o = l(t(6733)),
        i = l(t(3508)),
        d = t(5740),
        s = t(7582),
        c = t(2649),
        u = t(3599),
        m = (e) => o.default(e),
        h = (e) => ('/' === e.charAt(0) ? e.substring(1) : e),
        f = {
          menuUrl: 'http://next-navigation.ft.com/v2/menus',
          subNavigationUrl: 'http://next-navigation.ft.com/v2/hierarchy',
          interval: 9e5
        }
      class _ {
        constructor(e = {}) {
          ;(this.options = { ...f, ...e }),
            (this.poller = new r.default({
              url: this.options.menuUrl,
              refreshInterval: this.options.interval,
              parseData: m
            })),
            (this.initialPromise = this.poller.start({ initialRequest: !0 }))
        }
        async getMenusData() {
          return await this.initialPromise, (this.menuData = this.poller.getData()), this.menuData
        }
        async getMenusFor(e, a = 'uk') {
          let t = await this.getMenusData(),
            l = d.selectMenuDataForEdition(t, a)
          return s.decorateMenuData(l, e)
        }
        async getSubNavigationFor(e) {
          let a = h(e),
            t = `${this.options.subNavigationUrl}/${a}`,
            l = await i.default(t)
          if (l.ok) {
            let e = await l.json(),
              a = { ...e.item, selected: !0 }
            return { breadcrumb: e.ancestors.concat(a), subsections: e.children }
          }
          throw n.default(l.status, `Sub-navigation for ${a} could not be found.`)
        }
        getEditionsFor(e = 'uk') {
          if (c.isEdition(e)) return c.getEditions(e)
          throw Error(`The provided edition "${e}" is not a valid edition`)
        }
        getSubscribeAction() {
          return u.getSubscribeAction()
        }
      }
      a.Navigation = _
    },
    5740: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.selectMenuDataForEdition = void 0)
      let t = ['account', 'anon', 'footer', 'navbar-simple', 'navbar-right', 'navbar-right-anon', 'user']
      a.selectMenuDataForEdition = function (e, a) {
        let l = { navbar: e[`navbar-${a}`], drawer: e[`drawer-${a}`] }
        for (let a of t) e[a] && (l[a] = e[a])
        return l
      }
    },
    2978: (e, a, t) => {
      'use strict'
      e.exports = t(7133)
    },
    9186: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.LoadFontsEmbed = void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(3257)
      a.LoadFontsEmbed = function () {
        return l.default.createElement('script', { dangerouslySetInnerHTML: { __html: r.loadCustomFontsJS } })
      }
    },
    7133: (e, a, t) => {
      'use strict'
      var l = Object.create
          ? function (e, a, t, l) {
              void 0 === l && (l = t),
                Object.defineProperty(e, l, {
                  enumerable: !0,
                  get: function () {
                    return a[t]
                  }
                })
            }
          : function (e, a, t, l) {
              void 0 === l && (l = t), (e[l] = a[t])
            },
        r = function (e, a) {
          for (var t in e) 'default' === t || Object.prototype.hasOwnProperty.call(a, t) || l(a, e, t)
        }
      Object.defineProperty(a, '__esModule', { value: !0 }),
        r(t(9186), a),
        r(t(3257), a),
        r(t(6418), a),
        r(t(647), a)
    },
    647: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.documentStyles = void 0),
        (a.documentStyles = { overflowX: 'hidden', backgroundColor: '#fff1e5', color: '#33302e' })
    },
    6418: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.fontFaceURLs = void 0),
        (a.fontFaceURLs = [
          'https://www.ft.com/__origami/service/build/v3/font?font_format=woff2&font_name=MetricWeb-Regular&system_code=origami&version=1.12',
          'https://www.ft.com/__origami/service/build/v3/font?font_format=woff2&font_name=MetricWeb-Semibold&system_code=origami&version=1.12',
          'https://www.ft.com/__origami/service/build/v3/font?font_format=woff2&font_name=FinancierDisplayWeb-Regular&system_code=origami&version=1.12',
          'https://www.ft.com/__origami/service/build/v3/font?font_format=woff2&font_name=FinancierDisplayWeb-Bold&system_code=origami&version=1.12'
        ])
    },
    3257: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.loadCustomFontsClassNames = a.loadCustomFontsJS = void 0),
        (a.loadCustomFontsJS = `(${function () {
          var e = document.documentElement
          if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie))
            for (var a = ['sans', 'sans-bold', 'display', 'display-bold'], t = 0; t < a.length; t++)
              e.className = e.className.replace('o-typography--loading-' + a[t], '')
        }.toString()}());`),
        (a.loadCustomFontsClassNames =
          'o-typography--loading-sans o-typography--loading-sans-bold o-typography--loading-display o-typography--loading-display-bold')
    },
    2318: (e, a, t) => {
      'use strict'
      e.exports = t(7743)
    },
    55: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.NikkeiBrandLogo =
          a.CopyrightNotice =
          a.CompressedLegal =
          a.FooterContents =
          a.SectionTitle =
          a.SectionLinks =
            void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = ({ item: e, ...a }) => {
          let t = { 'data-o-tracking-do-not-track': !!e.disableTracking || null }
          return l.default.createElement(
            'a',
            Object.assign({}, a, { href: e.url, 'data-trackable': e.label }, t),
            l.default.createElement('span', { className: 'o-footer__matrix-link__copy' }, e.label)
          )
        },
        n = ({ submenu: e, index: a }) =>
          l.default.createElement(
            'div',
            { className: 'o-footer__matrix-content', id: `o-footer-section-${a}` },
            e.map((e, a) =>
              l.default.createElement(
                'div',
                { className: 'o-footer__matrix-column', key: `column-${a}` },
                e.map((e, a) =>
                  l.default.createElement(r, {
                    className: 'o-footer__matrix-link',
                    item: e,
                    key: `link-${a}`
                  })
                )
              )
            )
          )
      a.SectionLinks = n
      let o = ({ label: e, index: a }) => {
        let t = { 'aria-controls': `o-footer-section-${a}` }
        return l.default.createElement('h3', Object.assign({ className: 'o-footer__matrix-title' }, t), e)
      }
      ;(a.SectionTitle = o),
        (a.FooterContents = ({ footerData: e }) =>
          l.default.createElement(
            'div',
            { className: 'o-footer__row' },
            l.default.createElement('h2', { className: 'o-normalise-visually-hidden' }, 'Useful links'),
            l.default.createElement(
              'nav',
              { className: 'o-footer__matrix', role: 'navigation', 'aria-label': 'Useful links' },
              e.map((e, a) => {
                let t = e.submenu.items
                return l.default.createElement(
                  'div',
                  {
                    key: `group-${a}`,
                    className: `o-footer__matrix-group o-footer__matrix-group--${t.length}`
                  },
                  l.default.createElement(o, { label: e.label, index: a }),
                  l.default.createElement(n, { submenu: t, index: a })
                )
              }),
              l.default.createElement(
                'div',
                { className: 'o-footer__matrix-group o-footer__matrix-group--1' },
                l.default.createElement(
                  'h3',
                  { className: 'o-footer__matrix-title o-footer__matrix-title--link' },
                  l.default.createElement(
                    'a',
                    {
                      className: 'o-footer__matrix-link o-footer__matrix-link--more',
                      id: `o-footer-${e.length}`,
                      href: 'https://ft.com/more-from-ft-group'
                    },
                    l.default.createElement(
                      'span',
                      { className: 'o-footer__matrix-link__copy' },
                      'More from the FT Group'
                    )
                  )
                )
              )
            )
          )),
        (a.CopyrightNotice = ({ withoutMarketsData: e = !1 }) =>
          l.default.createElement(
            'div',
            { className: 'o-footer__copyright' },
            l.default.createElement(
              'small',
              null,
              `${
                e ? '' : 'Markets data delayed by at least 15 minutes. '
              }\xa9 THE FINANCIAL TIMES LTD ${new Date().getFullYear()}. `,
              l.default.createElement('abbr', { title: 'Financial Times', 'aria-label': 'F T' }, 'FT'),
              ' ',
              'and ‘Financial Times’ are trademarks of The Financial Times Ltd.',
              l.default.createElement('br', null),
              'The Financial Times and its journalism are subject to a self-regulation regime under the',
              ' ',
              l.default.createElement(
                'a',
                {
                  href: 'https://aboutus.ft.com/en-gb/ft-editorial-code/',
                  'aria-label': 'F T Editorial Code of Practice'
                },
                'FT Editorial Code of Practice'
              ),
              '.'
            )
          )),
        (a.CompressedLegal = ({ footerData: e }) => {
          let a = e.filter((e) => 'Legal & Privacy' === e.label)
          return l.default.createElement(
            l.default.Fragment,
            null,
            a.map((e, a) =>
              l.default.createElement(
                'div',
                { key: `column-${a}` },
                e.submenu.items.map((e, a) =>
                  l.default.createElement(
                    'ul',
                    { className: 'o-footer__legal-links', key: `list-${a}` },
                    e.map((e, a) =>
                      l.default.createElement(
                        'li',
                        { key: `item-${a}` },
                        l.default.createElement(r, { item: e, key: `link-${a}` })
                      )
                    )
                  )
                )
              )
            )
          )
        }),
        (a.NikkeiBrandLogo = () =>
          l.default.createElement(
            'div',
            { className: 'o-footer__brand' },
            l.default.createElement(
              'div',
              { className: 'o-footer__container' },
              l.default.createElement('div', { className: 'o-footer__brand-logo' })
            )
          ))
    },
    7743: (e, a, t) => {
      'use strict'
      a.LegalFooter = a.Footer = void 0
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(55)
      ;(a.Footer = function (e) {
        let a = e.data.footer.items,
          t = e.theme ? `${e.theme}` : 'dark'
        return l.default.createElement(
          'footer',
          { id: 'site-footer', className: `o-footer o-footer--theme-${t}`, 'data-o-component': 'o-footer' },
          l.default.createElement(
            'div',
            { className: 'o-footer__container' },
            l.default.createElement(r.FooterContents, { footerData: a }),
            l.default.createElement(r.CopyrightNotice, null)
          ),
          l.default.createElement(r.NikkeiBrandLogo, null)
        )
      }),
        (a.LegalFooter = function (e) {
          let a = e.data.footer.items,
            t = e.theme ? e.theme : 'dark'
          return l.default.createElement(
            'footer',
            { id: 'site-footer', className: `o-footer o-footer--theme-${t}`, 'data-o-component': 'o-footer' },
            l.default.createElement(
              'div',
              { className: 'o-footer__container' },
              l.default.createElement(r.CompressedLegal, { footerData: a }),
              l.default.createElement(r.CopyrightNotice, { withoutMarketsData: !0 })
            ),
            l.default.createElement(r.NikkeiBrandLogo, null)
          )
        })
    },
    137: (e, a, t) => {
      'use strict'
      e.exports = t(5207)
    },
    3905: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.SubscribeButton =
          a.EditionsSwitcher =
          a.DrawerSpecialItem =
          a.DrawerSingleItem =
          a.DrawerParentItem =
            void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(5673)
      ;(a.DrawerParentItem = ({ item: e, idSuffix: a }) => {
        var t, n
        let o = e.selected ? 'selected' : 'unselected'
        return l.default.createElement(
          l.default.Fragment,
          null,
          l.default.createElement(
            'div',
            { key: e.url, className: 'o-header__drawer-menu-toggle-wrapper' },
            l.default.createElement(
              'a',
              Object.assign(
                {
                  className: `o-header__drawer-menu-link o-header__drawer-menu-link--${o} o-header__drawer-menu-link--parent`,
                  href: null !== (t = e.url) && void 0 !== t ? t : void 0
                },
                r.ariaSelected(e),
                { 'data-trackable': e.label }
              ),
              e.label
            ),
            l.default.createElement(
              'button',
              {
                className: `o-header__drawer-menu-toggle o-header__drawer-menu-toggle--${o}`,
                'aria-controls': `o-header-drawer-child-${a}`,
                'data-trackable': `sub-level-toggle | ${e.label}`
              },
              `Show more ${e.label}`
            )
          ),
          l.default.createElement(
            'ul',
            {
              className: 'o-header__drawer-menu-list o-header__drawer-menu-list--child',
              id: `o-header-drawer-child-${a}`,
              'data-trackable': 'sub-level'
            },
            (null === (n = e.submenu) || void 0 === n ? void 0 : n.items).map((e) => {
              var a
              let t = e.selected ? 'selected' : 'unselected'
              return l.default.createElement(
                'li',
                { key: e.url, className: 'o-header__drawer-menu-item' },
                l.default.createElement(
                  'a',
                  Object.assign(
                    {
                      className: `o-header__drawer-menu-link o-header__drawer-menu-link--${t} o-header__drawer-menu-link--child`,
                      href: null !== (a = e.url) && void 0 !== a ? a : void 0,
                      'data-trackable': e.label
                    },
                    r.ariaSelected(e)
                  ),
                  e.label
                )
              )
            })
          )
        )
      }),
        (a.DrawerSingleItem = (e) => {
          var a
          let t = e.selected ? 'selected' : 'unselected'
          return l.default.createElement(
            'a',
            Object.assign(
              {
                className: `o-header__drawer-menu-link o-header__drawer-menu-link--${t}`,
                href: null !== (a = e.url) && void 0 !== a ? a : void 0,
                'data-trackable': e.label
              },
              r.ariaSelected(e)
            ),
            e.label
          )
        }),
        (a.DrawerSpecialItem = (e) => {
          var a
          let t = e.selected ? 'selected' : 'unselected'
          return l.default.createElement(
            'a',
            Object.assign(
              {
                className: `o-header__drawer-menu-link o-header__drawer-menu-link--${t} o-header__drawer-menu-link--secondary`,
                href: null !== (a = e.url) && void 0 !== a ? a : void 0,
                'data-trackable': e.label
              },
              r.ariaSelected(e)
            ),
            e.label
          )
        }),
        (a.EditionsSwitcher = (e) =>
          l.default.createElement(
            'ul',
            { className: 'o-header__drawer-menu-list' },
            e.others.map(({ id: e, name: a, url: t }) => {
              let r = `${t}?edition=${e}`
              return l.default.createElement(
                'li',
                { key: e, className: 'o-header__drawer-menu-item', 'data-trackable': 'edition-switcher' },
                l.default.createElement(
                  'a',
                  { className: 'o-header__drawer-menu-link', href: r, 'data-trackable': e },
                  'Switch to ',
                  a,
                  ' Edition'
                )
              )
            })
          )),
        (a.SubscribeButton = (e) =>
          l.default.createElement(
            'div',
            { className: 'o-header__drawer-actions' },
            l.default.createElement(
              'a',
              {
                className: 'o-header__drawer-button',
                role: 'button',
                href: e.url,
                'data-trackable': 'subscribe-button'
              },
              e.name
            )
          ))
    },
    6095: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.IncludeDrawer = void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(3905)
      a.IncludeDrawer = (e) => l.default.createElement(n, Object.assign({}, e))
      let n = (e) => {
          let a = e.data.editions,
            t = e.data.subscribeAction,
            [n, m, h] = e.data.drawer.items,
            f = e.userIsLoggedIn ? e.data.user : e.data.anon
          return l.default.createElement(
            'div',
            {
              className: 'o-header__drawer',
              id: 'o-header-drawer',
              role: 'modal',
              'aria-label': 'Drawer menu',
              'aria-modal': 'true',
              'data-o-header-drawer': !0,
              'data-o-header-drawer--no-js': !0,
              'data-trackable': 'drawer',
              'data-trackable-terminate': !0
            },
            l.default.createElement(
              'div',
              { className: 'o-header__drawer-inner' },
              l.default.createElement(o, Object.assign({}, a)),
              !e.userIsSubscribed && t && l.default.createElement(r.SubscribeButton, Object.assign({}, t)),
              l.default.createElement(i, null),
              l.default.createElement(
                'nav',
                { className: 'o-header__drawer-menu', 'aria-label': 'Edition switcher' },
                a && l.default.createElement(r.EditionsSwitcher, Object.assign({}, a))
              ),
              l.default.createElement(
                'nav',
                { className: 'o-header__drawer-menu o-header__drawer-menu--primary' },
                n ? l.default.createElement(d, Object.assign({}, n)) : null,
                m ? l.default.createElement(s, Object.assign({}, m)) : null,
                h ? l.default.createElement(c, Object.assign({}, h)) : null
              ),
              l.default.createElement(u, Object.assign({}, f))
            )
          )
        },
        o = (e) =>
          l.default.createElement(
            'div',
            { className: 'o-header__drawer-tools' },
            l.default.createElement(
              'button',
              {
                type: 'button',
                className: 'o-header__drawer-tools-close',
                title: 'Close side navigation menu',
                'aria-controls': 'o-header-drawer',
                'data-trackable': 'close'
              },
              l.default.createElement(
                'span',
                { className: 'o-header__visually-hidden' },
                'Close side navigation menu'
              )
            ),
            l.default.createElement(
              'a',
              { className: 'o-header__drawer-tools-logo', href: '/', 'data-trackable': 'logo' },
              l.default.createElement('span', { className: 'o-header__visually-hidden' }, 'Financial Times')
            ),
            e.current &&
              l.default.createElement(
                'p',
                { className: 'o-header__drawer-current-edition' },
                `${e.current.name} Edition`
              )
          ),
        i = () =>
          l.default.createElement(
            'div',
            { className: 'o-header__drawer-search' },
            l.default.createElement(
              'form',
              {
                className: 'o-header__drawer-search-form',
                action: '/search',
                role: 'search',
                'aria-label': 'Site search',
                'data-n-topic-search': !0,
                'data-n-topic-search-categories': 'concepts,equities',
                'data-n-topic-search-view-all': !0
              },
              l.default.createElement(
                'label',
                { className: 'o-header__visually-hidden', htmlFor: 'o-header-drawer-search-term' },
                'Search the ',
                l.default.createElement('abbr', { title: 'Financial Times' }, 'FT')
              ),
              l.default.createElement('input', {
                className: 'o-header__drawer-search-term',
                id: 'o-header-drawer-search-term',
                name: 'q',
                type: 'text',
                autoComplete: 'off',
                autoCorrect: 'off',
                autoCapitalize: 'off',
                spellCheck: !1,
                placeholder: 'Search the FT',
                'data-trackable': 'search-term',
                'data-n-topic-search-input': !0
              }),
              l.default.createElement(
                'button',
                {
                  className: 'o-header__drawer-search-submit',
                  type: 'submit',
                  'data-trackable': 'search-submit'
                },
                l.default.createElement('span', { className: 'o-header__visually-hidden' }, 'Search')
              )
            )
          ),
        d = (e) => {
          var a
          let t = e.label.toLowerCase().replace(' ', '-')
          return l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement(
              'h2',
              { id: t, className: 'o-header__drawer-menu-item o-header__drawer-menu-item--heading' },
              e.label
            ),
            l.default.createElement(
              'ul',
              { 'aria-labelledby': t, className: 'o-header__drawer-menu-list' },
              (null === (a = e.submenu) || void 0 === a ? void 0 : a.items).map((e, a) =>
                l.default.createElement(
                  'li',
                  { key: e.url, className: 'o-header__drawer-menu-item' },
                  e.submenu
                    ? l.default.createElement(r.DrawerParentItem, { item: e, idSuffix: `${a}` })
                    : l.default.createElement(r.DrawerSingleItem, Object.assign({}, e))
                )
              )
            )
          )
        },
        s = (e) => {
          var a
          let t = e.label.toLowerCase().replace(' ', '-')
          return l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement(
              'h2',
              { id: t, className: 'o-header__drawer-menu-item o-header__drawer-menu-item--heading' },
              e.label
            ),
            l.default.createElement(
              'ul',
              { 'aria-labelledby': t, className: 'o-header__drawer-menu-list' },
              (null === (a = e.submenu) || void 0 === a ? void 0 : a.items).map((e, a) =>
                l.default.createElement(
                  'li',
                  { key: e.url, className: 'o-header__drawer-menu-item' },
                  e.submenu
                    ? l.default.createElement(r.DrawerParentItem, { item: e, idSuffix: 'inner' + a })
                    : l.default.createElement(r.DrawerSingleItem, Object.assign({}, e))
                )
              )
            )
          )
        },
        c = (e) => {
          var a
          return l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement(
              'ul',
              { className: 'o-header__drawer-menu-list o-header__drawer-menu-list--divide' },
              (null === (a = e.submenu) || void 0 === a ? void 0 : a.items).map((e) =>
                l.default.createElement(
                  'li',
                  { key: e.url, className: 'o-header__drawer-menu-item' },
                  l.default.createElement(r.DrawerSpecialItem, Object.assign({}, e))
                )
              )
            )
          )
        },
        u = (e) =>
          l.default.createElement(
            'nav',
            { className: 'o-header__drawer-menu o-header__drawer-menu--user', 'data-trackable': 'user-nav' },
            l.default.createElement(
              'ul',
              { className: 'o-header__drawer-menu-list' },
              e.items.map((e) => {
                var a
                return l.default.createElement(
                  'li',
                  { key: e.url, className: 'o-header__drawer-menu-item' },
                  l.default.createElement(
                    'a',
                    {
                      className: 'o-header__drawer-menu-link',
                      href: null !== (a = e.url) && void 0 !== a ? a : void 0,
                      'data-trackable': e.label
                    },
                    e.label
                  )
                )
              })
            )
          )
    },
    50: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.MobileNav = a.UserActionsNav = a.NavListRight = a.NavListLeft = a.NavDesktop = void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(5673)
      a.MobileNav = (e) => {
        let a = e.data['navbar-simple'].items.map((e) => e.url)
        return e.data.currentPath && a.includes(e.data.currentPath)
          ? l.default.createElement(n, { items: e.data['navbar-simple'].items })
          : null
      }
      let n = ({ items: e }) =>
        l.default.createElement(
          'nav',
          {
            id: 'o-header-nav-mobile',
            className: 'o-header__row o-header__nav o-header__nav--mobile',
            'aria-hidden': 'true',
            'data-trackable': 'header-nav:mobile'
          },
          l.default.createElement(
            'ul',
            { className: 'o-header__nav-list' },
            e.map((e, a) => {
              var t
              return l.default.createElement(
                'li',
                { className: 'o-header__nav-item', key: `link-${a}` },
                l.default.createElement(
                  'a',
                  Object.assign(
                    {
                      className: 'o-header__nav-link o-header__nav-link--primary',
                      href: null !== (t = e.url) && void 0 !== t ? t : void 0
                    },
                    r.ariaSelected(e),
                    { 'data-trackable': e.label }
                  ),
                  e.label
                )
              )
            })
          )
        )
      ;(a.NavDesktop = (e) =>
        l.default.createElement(
          'nav',
          {
            id: 'o-header-nav-desktop',
            className: 'o-header__row o-header__nav o-header__nav--desktop',
            role: 'navigation',
            'aria-label': 'Primary navigation',
            'data-trackable': 'header-nav:desktop'
          },
          l.default.createElement('div', { className: 'o-header__container' }, e.children)
        )),
        (a.NavListLeft = (e) =>
          l.default.createElement(
            'ul',
            { className: 'o-header__nav-list o-header__nav-list--left', 'data-trackable': 'primary-nav' },
            e.data.navbar.items.map((a, t) => {
              var n
              return l.default.createElement(
                'li',
                { className: 'o-header__nav-item', key: `link-${t}` },
                l.default.createElement(
                  'a',
                  Object.assign(
                    {
                      className: 'o-header__nav-link o-header__nav-link--primary',
                      href: null !== (n = a.url) && void 0 !== n ? n : void 0,
                      id: `o-header-link-${t}`
                    },
                    r.ariaSelected(a),
                    { 'data-trackable': a.label }
                  ),
                  a.label
                ),
                e.showMegaNav && Array.isArray(a.meganav)
                  ? l.default.createElement(i, { meganav: a.meganav, label: a.label, index: t })
                  : null
              )
            })
          )),
        (a.NavListRight = (e) =>
          e.userIsLoggedIn ? l.default.createElement(o, { items: e.data['navbar-right'].items }) : null)
      let o = ({ items: e }) =>
          l.default.createElement(
            'ul',
            {
              'data-component': 'nav-list--right',
              className: 'o-header__nav-list o-header__nav-list--right',
              'data-trackable': 'user-nav'
            },
            e.map((e, a) => {
              var t
              return l.default.createElement(
                'li',
                { className: 'o-header__nav-item', key: `link-${a}` },
                l.default.createElement(
                  'a',
                  {
                    className: 'o-header__nav-link',
                    href: null !== (t = e.url) && void 0 !== t ? t : void 0,
                    'data-trackable': e.label
                  },
                  e.label
                )
              )
            })
          ),
        i = ({ label: e, meganav: a, index: t }) => {
          let r = a.find(({ component: e }) => 'sectionlist' === e),
            n = a.find(({ component: e }) => 'articlelist' === e)
          return l.default.createElement(
            'div',
            {
              className: 'o-header__mega',
              id: `o-header-mega-${t}`,
              role: 'group',
              'aria-labelledby': `o-header-link-${t}`,
              'data-o-header-mega': !0,
              'data-trackable': `meganav | ${e}`
            },
            l.default.createElement(
              'div',
              { className: 'o-header__container' },
              l.default.createElement(
                'div',
                { className: 'o-header__mega-wrapper' },
                r ? l.default.createElement(d, Object.assign({}, r)) : null,
                n ? l.default.createElement(s, Object.assign({}, n)) : null
              )
            )
          )
        },
        d = ({ title: e, data: a }) =>
          l.default.createElement(
            'div',
            {
              className: 'o-header__mega-column o-header__mega-column--subsections',
              'data-trackable': 'sections'
            },
            l.default.createElement('div', { className: 'o-header__mega-heading' }, e),
            l.default.createElement(
              'div',
              { className: 'o-header__mega-content' },
              l.default.createElement(
                'ul',
                { className: 'o-header__mega-list' },
                null == a
                  ? void 0
                  : a.map((e) =>
                      e.map((e, a) => {
                        var t
                        return l.default.createElement(
                          'li',
                          { className: 'o-header__mega-item', key: `link-${a}` },
                          l.default.createElement(
                            'a',
                            Object.assign(
                              {
                                className: 'o-header__mega-link',
                                href: null !== (t = e.url) && void 0 !== t ? t : void 0
                              },
                              r.ariaSelected(e),
                              { 'data-trackable': 'link' }
                            ),
                            e.label
                          )
                        )
                      })
                    )
              )
            )
          ),
        s = ({ title: e, data: a }) =>
          l.default.createElement(
            'div',
            {
              className: 'o-header__mega-column o-header__mega-column--articles',
              'data-trackable': 'popular'
            },
            l.default.createElement('div', { className: 'o-header__mega-heading' }, e),
            l.default.createElement(
              'div',
              { className: 'o-header__mega-content' },
              l.default.createElement(
                'ul',
                { className: 'o-header__mega-list' },
                null == a
                  ? void 0
                  : a.map((e, a) => {
                      var t
                      return l.default.createElement(
                        'li',
                        { className: 'o-header__mega-item', key: `link-${a}` },
                        l.default.createElement(
                          'a',
                          Object.assign(
                            {
                              className: 'o-header__mega-link',
                              href: null !== (t = e.url) && void 0 !== t ? t : void 0
                            },
                            r.ariaSelected(e),
                            { 'data-trackable': 'link' }
                          ),
                          e.label
                        )
                      )
                    })
              )
            )
          )
      a.UserActionsNav = (e) => {
        let a = e.data['navbar-right-anon'].items
        return l.default.createElement(
          'div',
          { className: 'o-header__row o-header__anon', 'data-trackable': 'header-anon' },
          l.default.createElement(
            'ul',
            { className: 'o-header__anon-list' },
            a.map((e, a) => {
              var t
              return l.default.createElement(
                'li',
                { className: 'o-header__anon-item', key: `link-${a}` },
                l.default.createElement(
                  'a',
                  {
                    className: 'o-header__anon-link',
                    href: null !== (t = e.url) && void 0 !== t ? t : void 0,
                    'data-trackable': e.label
                  },
                  e.label
                )
              )
            })
          )
        )
      }
    },
    1245: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.Search = void 0)
      let l = (function (e) {
        return e && e.__esModule ? e : { default: e }
      })(t(9521))
      a.Search = ({ instance: e }) =>
        l.default.createElement(
          'div',
          {
            id: `o-header-search-${e}`,
            className: `o-header__row o-header__search o-header__search--${e}`,
            'data-trackable': 'header-search',
            'data-o-header-search': !0
          },
          l.default.createElement(
            'div',
            { className: 'o-header__container' },
            l.default.createElement(
              'form',
              {
                className: 'o-header__search-form',
                action: '/search',
                role: 'search',
                'aria-label': 'Site search',
                'data-n-topic-search': !0,
                'data-n-topic-search-categories': 'concepts,equities',
                'data-n-topic-search-view-all': !0
              },
              l.default.createElement(
                'label',
                { className: 'o-header__visually-hidden', htmlFor: `o-header-search-term-${e}` },
                'Search the ',
                l.default.createElement('abbr', { title: 'Financial Times' }, 'FT')
              ),
              l.default.createElement('input', {
                className: 'o-header__search-term',
                id: `o-header-search-term-${e}`,
                name: 'q',
                type: 'text',
                autoComplete: 'off',
                autoCorrect: 'off',
                autoCapitalize: 'off',
                spellCheck: !1,
                'data-trackable': 'search-term',
                placeholder: 'Search the FT',
                'data-n-topic-search-input': !0
              }),
              l.default.createElement(
                'button',
                { className: 'o-header__search-submit', type: 'submit', 'data-trackable': 'search-submit' },
                'Search'
              ),
              l.default.createElement(
                'button',
                {
                  className: 'o-header__search-close o--if-js',
                  type: 'button',
                  'aria-controls': `o-header-search-${e}`,
                  title: 'Close search bar',
                  'data-trackable': 'close'
                },
                l.default.createElement(
                  'span',
                  { className: 'o-header__visually-hidden' },
                  'Close search bar'
                )
              )
            )
          )
        )
    },
    3787: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.TopColumnRightSticky =
          a.TopColumnCenterSticky =
          a.TopColumnLeftSticky =
          a.TopWrapperSticky =
          a.StickyHeaderWrapper =
            void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(5475)
      a.StickyHeaderWrapper = (e) =>
        l.default.createElement(
          'header',
          {
            className: 'o-header o-header--simple o-header--sticky o--if-js',
            'data-o-component': 'o-header',
            'data-o-header--sticky': !0,
            'aria-hidden': 'true'
          },
          e.children
        )
      let n = () =>
          l.default.createElement(
            'a',
            {
              href: '#',
              className: 'o-header__top-icon-link o-header__top-icon-link--menu',
              'aria-controls': 'o-header-drawer',
              'data-trackable': 'drawer-toggle',
              tabIndex: -1
            },
            l.default.createElement('span', { className: 'o-header__top-link-label' }, 'Menu')
          ),
        o = () =>
          l.default.createElement(
            'a',
            {
              href: '#',
              className: 'o-header__top-icon-link o-header__top-icon-link--search',
              'aria-controls': 'o-header-search-sticky',
              'data-trackable': 'search-toggle',
              tabIndex: -1
            },
            l.default.createElement('span', { className: 'o-header__top-link-label' }, 'Search')
          ),
        i = (e) =>
          l.default.createElement(
            'div',
            { className: 'o-header__top-takeover' },
            l.default.createElement(
              'div',
              { className: 'o-header__nav' },
              l.default.createElement(
                'ul',
                { className: 'o-header__nav-list o-header__nav-list--left', 'data-trackable': 'primary-nav' },
                e.data.navbar.items.map((e, a) => {
                  var t
                  return l.default.createElement(
                    'li',
                    { className: 'o-header__nav-item', key: `link-${a}` },
                    l.default.createElement(
                      'a',
                      {
                        className: 'o-header__nav-link o-header__nav-link--primary',
                        href: null !== (t = e.url) && void 0 !== t ? t : void 0,
                        'data-trackable': e.label,
                        tabIndex: -1
                      },
                      e.label
                    )
                  )
                })
              )
            )
          ),
        d = () =>
          l.default.createElement(
            'a',
            {
              className: 'o-header__top-logo o-header__hide--L',
              'data-trackable': 'logo',
              href: '/',
              title: 'Go to Financial Times homepage',
              tabIndex: -1
            },
            l.default.createElement('span', { className: 'o-header__visually-hidden' }, 'Financial Times')
          ),
        s = (e) => {
          let [a, t] = e.data['navbar-right-anon'].items
          return l.default.createElement(
            'div',
            { className: 'o-header__nav' },
            l.default.createElement(
              'div',
              { className: 'o-header__top-column o-header__top-column--right' },
              t &&
                l.default.createElement(r.SubscribeButton, {
                  item: t,
                  variant: 'sticky',
                  className: 'o-header__top-button--hide-m'
                }),
              a && l.default.createElement(r.SignInLink, { item: a, variant: 'sticky', className: '' })
            )
          )
        },
        c = ({ className: e }) =>
          l.default.createElement(
            'a',
            {
              className: `o-header__top-icon-link o-header__top-icon-link--myft ${e}`,
              href: '/myft',
              'data-trackable': 'my-ft',
              tabIndex: -1
            },
            l.default.createElement('span', { className: 'o-header__visually-hidden' }, 'myFT')
          )
      ;(a.TopWrapperSticky = (e) =>
        l.default.createElement(
          'div',
          { className: 'o-header__row o-header__top', 'data-trackable': 'header-sticky' },
          l.default.createElement(
            'div',
            { className: 'o-header__container' },
            l.default.createElement('div', { className: 'o-header__top-wrapper' }, e.children)
          )
        )),
        (a.TopColumnLeftSticky = () =>
          l.default.createElement(
            'div',
            { className: 'o-header__top-column o-header__top-column--left' },
            l.default.createElement(n, null),
            l.default.createElement(o, null)
          )),
        (a.TopColumnCenterSticky = (e) =>
          l.default.createElement(
            'div',
            { className: 'o-header__top-column o-header__top-column--center' },
            l.default.createElement(i, Object.assign({}, e)),
            l.default.createElement(d, null)
          ))
      let u = (e) => {
        var a
        let t = null === (a = e.data['navbar-right-anon'].items) || void 0 === a ? void 0 : a[1]
        return l.default.createElement(
          l.default.Fragment,
          null,
          !e.userIsSubscribed &&
            t &&
            l.default.createElement(r.SubscribeButton, {
              item: t,
              variant: 'sticky',
              className: 'o-header__top-button--hide-m'
            }),
          l.default.createElement(c, { className: '' })
        )
      }
      a.TopColumnRightSticky = (e) => {
        let a
        return (
          e.userIsLoggedIn
            ? (a = l.default.createElement(u, Object.assign({}, e)))
            : e.showUserNavigation && (a = l.default.createElement(s, Object.assign({}, e))),
          l.default.createElement('div', { className: 'o-header__top-column o-header__top-column--right' }, a)
        )
      }
    },
    9630: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.SubNavigation = void 0)
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(5673)
      a.SubNavigation = (e) =>
        l.default.createElement(
          n,
          null,
          l.default.createElement(o, { items: e.data.breadcrumb }),
          l.default.createElement(i, { items: e.data.subsections }),
          l.default.createElement(i, { items: e.data['subsections-right'], rightAlignment: !0 })
        )
      let n = (e) =>
          l.default.createElement(
            'div',
            {
              className: 'o-header__subnav',
              role: 'navigation',
              'aria-label': 'Sub navigation',
              'data-o-header-subnav': !0,
              'data-trackable': 'header-subnav'
            },
            l.default.createElement(
              'div',
              { className: 'o-header__container' },
              l.default.createElement(
                'div',
                { className: 'o-header__subnav-wrap-outside' },
                l.default.createElement(
                  'div',
                  { className: 'o-header__subnav-wrap-inside', 'data-o-header-subnav-wrapper': !0 },
                  l.default.createElement('div', { className: 'o-header__subnav-content' }, e.children)
                ),
                l.default.createElement('button', {
                  className: 'o-header__subnav-button o-header__subnav-button--left',
                  title: 'scroll left',
                  'aria-label': 'scroll left',
                  'aria-hidden': 'true',
                  disabled: !0
                }),
                l.default.createElement('button', {
                  className: 'o-header__subnav-button o-header__subnav-button--right',
                  title: 'scroll right',
                  'aria-label': 'scroll right',
                  'aria-hidden': 'true',
                  disabled: !0
                })
              )
            )
          ),
        o = ({ items: e }) =>
          l.default.createElement(
            'ol',
            {
              className: 'o-header__subnav-list o-header__subnav-list--breadcrumb',
              'aria-label': 'Breadcrumb',
              'data-trackable': 'breadcrumb'
            },
            null == e
              ? void 0
              : e.map((e, a) => {
                  var t
                  let n = e.selected ? 'o-header__subnav-link--highlight' : ''
                  return l.default.createElement(
                    'li',
                    { className: 'o-header__subnav-item', key: `item-${a}` },
                    l.default.createElement(
                      'a',
                      Object.assign(
                        {
                          className: `o-header__subnav-link ${n}`,
                          href: null !== (t = e.url) && void 0 !== t ? t : void 0
                        },
                        r.ariaSelected(e),
                        { 'data-trackable': e.label }
                      ),
                      e.label
                    )
                  )
                })
          ),
        i = ({ items: e, rightAlignment: a }) =>
          e && 0 !== e.length
            ? l.default.createElement(
                'ul',
                {
                  className:
                    'o-header__subnav-list o-header__subnav-list--children' +
                    (a ? ' o-header__subnav-list--right' : ''),
                  'aria-label': a ? 'Additional Sub Navigation' : 'Subsections',
                  'data-trackable': 'subsections'
                },
                e.map((e, a) => {
                  var t
                  let n = e.selected ? 'o-header__subnav-link--highlight' : ''
                  return l.default.createElement(
                    'li',
                    { className: 'o-header__subnav-item', key: `item-${a}` },
                    l.default.createElement(
                      'a',
                      Object.assign(
                        {
                          className: `o-header__subnav-link ${n}`,
                          href: null !== (t = e.url) && void 0 !== t ? t : void 0
                        },
                        r.ariaSelected(e),
                        { 'data-trackable': e.label }
                      ),
                      e.label
                    )
                  )
                })
              )
            : null
    },
    4650: (e, a, t) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 })
      let l = (function (e) {
        return e && e.__esModule ? e : { default: e }
      })(t(9521))
      a.default = ({ title: e, ...a }) =>
        l.default.createElement(
          'svg',
          Object.assign({ viewBox: '0 0 1054 86' }, a),
          void 0 === e
            ? l.default.createElement('title', null, 'brand-ft-masthead')
            : e
            ? l.default.createElement('title', null, e)
            : null,
          l.default.createElement('path', {
            d: 'M26.177 72.609c0 5.938 1.697 7.295 12.554 7.295v3.732H.9v-3.732c7.464 0 10.01-.679 10.01-7.125V12.215c0-6.447-2.546-7.126-10.01-7.126V1.357h63.448l.34 22.563h-3.054C59.937 6.956 55.696 5.43 39.919 5.43H26.008v33.59h11.196c10.688 0 11.367-1.697 12.215-10.179h3.054v24.599h-3.054c-.848-8.482-1.527-10.01-12.215-10.01H26.008v29.18h.17zm46.314 11.027v-3.732c7.465 0 10.01-.679 10.01-7.125V12.215c0-6.447-2.545-7.126-10.01-7.126V1.357h35.287V5.09c-7.465 0-10.01.679-10.01 7.126v60.564c0 6.446 2.545 7.125 10.01 7.125v3.732H72.49zm115.36 1.357l-56.323-69.725V72.44c0 6.617 4.58 7.634 12.385 7.634v3.733h-29.858v-3.733c7.803 0 12.045-1.017 12.045-7.634V8.991c-3.563-3.732-6.108-3.902-12.045-3.902V1.357h26.465l43.09 55.475V12.554c0-6.616-4.58-7.634-12.384-7.634V1.357h30.027V5.09c-7.803 0-12.045 1.018-12.045 7.635v72.27h-1.357zm40.207-1.357h-29.689v-3.732c7.804 0 11.367-1.018 13.911-7.804L239.085.509h7.464l28.84 72.1c2.545 6.447 3.732 7.125 9.67 7.125v3.732h-34.438v-3.732c10.518 0 11.536-.848 8.99-7.125l-8.481-21.884h-25.787L217.71 71.93c-2.375 6.447 1.357 7.804 10.518 7.804v3.902h-.17zm-1.188-37.153h22.393l-11.705-29.518-10.688 29.518zm135.548 38.51l-56.153-69.725V72.44c0 6.617 4.58 7.634 12.384 7.634v3.733h-29.18v-3.733c7.126 0 11.367-1.017 11.367-7.634V9.161c-4.071-3.732-7.125-4.072-13.91-4.072V1.357h28.16l43.09 55.475V12.554c0-6.616-4.58-7.634-12.383-7.634V1.357h29.858V5.09c-7.804 0-12.045 1.018-12.045 7.635v72.27h-1.188zm83.297-83.805h2.036l1.187 24.598-3.053.17c-2.036-14.08-9.5-21.545-23.242-21.545-15.268 0-26.804 13.063-26.804 33.081 0 25.617 16.116 40.206 33.08 40.206 7.296 0 13.912-2.035 20.358-8.99l2.376 2.374c-5.26 7.465-15.608 13.742-29.52 13.742-20.696 0-41.732-15.608-41.732-41.734C380.4 17.813 399.57 0 422.813 0c11.027 0 16.795 4.75 19.848 4.75 1.357 0 2.375-1.187 3.054-3.562zm12.723 82.448v-3.732c7.465 0 10.01-.679 10.01-7.125V12.215c0-6.447-2.545-7.126-10.01-7.126V1.357h35.287V5.09c-7.464 0-10.01.679-10.01 7.126v60.564c0 6.446 2.546 7.125 10.01 7.125v3.732h-35.287zm68.538 0h-27.653v-3.732c6.108 0 9.331-1.018 11.876-7.804L538.003.509h7.464l28.84 72.1c2.545 6.447 3.733 7.125 9.67 7.125v3.732H549.54v-3.732c10.518 0 11.536-.848 8.991-7.125l-8.482-21.884h-25.786l-7.635 21.205c-2.375 6.447 1.358 7.804 10.519 7.804v3.902h-.17zm-1.188-37.153h22.394l-11.536-29.518-10.858 29.518zm63.957 37.153v-3.732c7.465 0 10.01-.679 10.01-7.125V12.215c0-6.447-2.545-7.126-10.01-7.126V1.357h35.117V5.09c-7.464 0-9.84.679-9.84 7.126v61.073c0 5.428 2.715 6.107 7.126 6.107h4.241c15.947 0 21.036-2.375 25.447-20.527l3.054.339-2.545 24.26h-62.6v.17zM760.75 1.357l.339 23.92h-3.054C756.34 7.634 752.098 5.43 736.32 5.43h-5.089v67.18c0 6.447 2.375 7.295 12.554 7.295v3.732h-40.376v-3.732c10.179 0 12.723-1.018 12.723-7.295V5.429h-5.089c-15.777 0-20.018 2.205-21.715 19.848h-3.053l.339-23.92h74.136zm7.973 82.28v-3.733c7.465 0 10.01-.679 10.01-7.125V12.215c0-6.447-2.545-7.126-10.01-7.126V1.357h35.287V5.09c-7.465 0-10.01.679-10.01 7.126v60.564c0 6.446 2.545 7.125 10.01 7.125v3.732h-35.287zM910.21 1.356V5.09c-7.465 0-10.688.34-10.01 6.956l6.447 61.073c.679 6.277 3.054 6.955 10.518 6.955v3.733h-35.117v-3.733c7.295 0 9.84-.678 9.331-6.955L884.762 8.99l-25.956 76.172h-1.018L832.34 8.822l-6.108 64.126c-.678 6.447 3.733 7.125 11.197 7.125v3.733h-27.483v-3.733c7.465 0 10.01-1.187 10.518-7.125l6.447-61.073c.679-6.446-2.545-6.955-10.01-6.955V1.357h28.84l17.305 56.153 18.661-56.153h28.5zm65.653 52.082h-3.053c-.849-8.482-1.527-10.01-12.215-10.01H948.04v29.859c0 5.428 2.715 6.107 7.125 6.107h6.786c15.947 0 21.036-2.375 25.447-20.527l3.054.339-2.884 24.26h-64.805v-3.733c7.464 0 10.009-.678 10.009-7.125V12.215c0-6.447-2.545-7.126-10.01-7.126V1.357h62.261l.34 20.527h-3.054c-1.866-14.59-5.598-16.286-21.885-16.286H948.21v33.42h12.554c10.687 0 11.366-1.696 12.214-10.178h3.054v24.599h-.17zm65.484 13.232c0-7.464-4.75-11.196-12.893-15.777l-13.063-6.786c-9.84-5.259-15.607-11.027-15.607-21.375C999.783 9.84 1010.81 0 1025.23 0c9.84 0 14.929 4.75 17.813 4.75 1.866 0 2.714-1.187 3.562-3.562h2.375l1.188 23.072-3.054.17c-1.696-11.198-9.67-19.85-20.866-19.85-8.483 0-14.081 5.09-14.081 12.215 0 7.804 5.937 11.027 12.554 14.59l11.196 5.937c10.519 5.768 17.983 11.536 17.983 22.563 0 14.59-12.554 24.939-28.161 24.939-11.028 0-16.456-5.26-19.34-5.26-1.866 0-2.884 1.697-3.732 4.242h-2.376l-1.696-24.43 3.054-.339c2.375 15.268 12.893 21.545 23.411 21.545 8.822-.17 16.286-4.071 16.286-13.91z',
            fill: '#231F20',
            fillRule: 'evenodd'
          })
        )
    },
    5475: (e, a, t) => {
      'use strict'
      var l = function (e) {
        return e && e.__esModule ? e : { default: e }
      }
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.SignInLink =
          a.SubscribeButton =
          a.TopColumnRightAnon =
          a.TopColumnRight =
          a.TopColumnCenterNoLink =
          a.TopColumnCenter =
          a.TopColumnLeft =
          a.TopWrapper =
          a.HeaderWrapper =
            void 0)
      let r = l(t(9521)),
        n = l(t(4650))
      a.HeaderWrapper = (e) =>
        r.default.createElement(
          'header',
          {
            id: 'site-navigation',
            className: `o-header o-header--${e.variant || 'simple'}`,
            'data-o-component': 'o-header',
            'data-o-header--no-js': !0,
            tabIndex: -1
          },
          e.children
        )
      let o = () =>
          r.default.createElement(
            'a',
            {
              href: '#o-header-drawer',
              className: 'o-header__top-icon-link o-header__top-icon-link--menu',
              'aria-controls': 'o-header-drawer',
              title: 'Open side navigation menu',
              'data-trackable': 'drawer-toggle'
            },
            r.default.createElement(
              'span',
              { className: 'o-header__top-link-label' },
              'Open side navigation menu'
            )
          ),
        i = () =>
          r.default.createElement(
            'a',
            {
              href: '#o-header-search-primary',
              className: 'o-header__top-icon-link o-header__top-icon-link--search',
              'aria-controls': 'o-header-search-primary',
              title: 'Open search bar',
              'data-trackable': 'search-toggle'
            },
            r.default.createElement('span', { className: 'o-header__top-link-label' }, 'Open search bar')
          ),
        d = ({ className: e }) =>
          r.default.createElement(
            'a',
            {
              className: `o-header__top-icon-link o-header__top-icon-link--myft ${e}`,
              id: 'o-header-top-link-myft',
              href: '/myft',
              'data-trackable': 'my-ft',
              'data-tour-stage': 'myFt',
              'aria-label': 'My F T'
            },
            r.default.createElement('span', { className: 'o-header__visually-hidden' }, 'myFT')
          )
      ;(a.TopWrapper = (e) =>
        r.default.createElement(
          'div',
          { className: 'o-header__row o-header__top', 'data-trackable': 'header-top' },
          r.default.createElement(
            'div',
            { className: 'o-header__container' },
            r.default.createElement('div', { className: 'o-header__top-wrapper' }, e.children)
          )
        )),
        (a.TopColumnLeft = () =>
          r.default.createElement(
            'div',
            { className: 'o-header__top-column o-header__top-column--left' },
            r.default.createElement(o, null),
            r.default.createElement(i, null)
          )),
        (a.TopColumnCenter = () =>
          r.default.createElement(
            'div',
            { className: 'o-header__top-column o-header__top-column--center' },
            r.default.createElement(
              'a',
              {
                className: 'o-header__top-logo',
                style: { backgroundImage: 'none' },
                'data-trackable': 'logo',
                href: '/',
                title: 'Go to Financial Times homepage'
              },
              r.default.createElement(n.default, { title: 'Financial Times' })
            )
          )),
        (a.TopColumnCenterNoLink = () =>
          r.default.createElement(
            'div',
            { className: 'o-header__top-column o-header__top-column--center' },
            r.default.createElement(
              'div',
              { className: 'o-header__top-logo', style: { backgroundImage: 'none' } },
              r.default.createElement(n.default, { title: 'Financial Times' })
            )
          ))
      let s = (e) => {
          var a, t
          let l =
            null === (t = null === (a = e.data['navbar-right-anon']) || void 0 === a ? void 0 : a.items) ||
            void 0 === t
              ? void 0
              : t[1]
          return r.default.createElement(
            'div',
            { className: 'o-header__top-column o-header__top-column--right' },
            !e.userIsSubscribed &&
              l &&
              r.default.createElement(u, {
                item: l,
                variant: e.variant,
                className: 'o-header__top-button--hide-m'
              }),
            r.default.createElement(d, { className: '' })
          )
        },
        c = ({ item: e, variant: a, className: t }) => {
          var l
          return r.default.createElement(
            'a',
            Object.assign(
              {
                className: `o-header__top-link ${t}`,
                href: null !== (l = e.url) && void 0 !== l ? l : void 0,
                'data-trackable': e.label
              },
              'sticky' === a ? { tabIndex: -1 } : null
            ),
            e.label
          )
        }
      a.SignInLink = c
      let u = ({ item: e, variant: a, className: t }) => {
        var l
        return r.default.createElement(
          'a',
          Object.assign(
            {
              className: `o-header__top-button ${t}`,
              role: 'button',
              href: null !== (l = e.url) && void 0 !== l ? l : void 0,
              'data-trackable': e.label
            },
            'sticky' === a ? { tabIndex: -1 } : null
          ),
          e.label
        )
      }
      a.SubscribeButton = u
      let m = ({ items: e, variant: a }) => {
        let [t, l] = e
        return r.default.createElement(
          'div',
          { className: 'o-header__top-column o-header__top-column--right' },
          l && r.default.createElement(u, { item: l, variant: a, className: 'o-header__top-button--hide-m' }),
          t && r.default.createElement(c, { item: t, variant: a, className: 'o-header__top-link--hide-m' }),
          r.default.createElement(d, { className: 'o-header__top-icon-link--show-m' })
        )
      }
      ;(a.TopColumnRightAnon = m),
        (a.TopColumnRight = (e) => {
          if (e.userIsLoggedIn) return r.default.createElement(s, Object.assign({}, e))
          {
            let a = e.data['navbar-right-anon'].items
            return r.default.createElement(m, { items: a, variant: e.variant })
          }
        })
    },
    5207: (e, a, t) => {
      'use strict'
      a.Drawer = a.NoOutboundLinksHeader = a.LogoOnly = a.Header = void 0
      let l = (function (e) {
          return e && e.__esModule ? e : { default: e }
        })(t(9521)),
        r = t(5475),
        n = t(50),
        o = t(3787),
        i = t(9630),
        d = t(6095),
        s = t(1245),
        c = {
          showSubNavigation: !0,
          showUserNavigation: !0,
          userIsAnonymous: !0,
          userIsLoggedIn: !1,
          showStickyHeader: !0,
          showMegaNav: !0
        }
      function u(e) {
        let a = e.showUserNavigation && !e.userIsLoggedIn,
          t = e.showSubNavigation && (e.data.breadcrumb || e.data.subsections)
        return l.default.createElement(
          r.HeaderWrapper,
          Object.assign({}, e),
          a ? l.default.createElement(n.UserActionsNav, Object.assign({}, e)) : null,
          l.default.createElement(
            r.TopWrapper,
            null,
            l.default.createElement(r.TopColumnLeft, null),
            e.showLogoLink
              ? l.default.createElement(r.TopColumnCenter, null)
              : l.default.createElement(r.TopColumnCenterNoLink, null),
            l.default.createElement(r.TopColumnRight, Object.assign({}, e))
          ),
          l.default.createElement(s.Search, { instance: 'primary' }),
          l.default.createElement(n.MobileNav, Object.assign({}, e)),
          l.default.createElement(
            n.NavDesktop,
            null,
            l.default.createElement(n.NavListLeft, Object.assign({}, e)),
            e.showUserNavigation ? l.default.createElement(n.NavListRight, Object.assign({}, e)) : null
          ),
          t ? l.default.createElement(i.SubNavigation, Object.assign({}, e)) : null
        )
      }
      function m(e) {
        return e.showStickyHeader
          ? l.default.createElement(
              o.StickyHeaderWrapper,
              Object.assign({}, e),
              l.default.createElement(
                o.TopWrapperSticky,
                null,
                l.default.createElement(o.TopColumnLeftSticky, null),
                l.default.createElement(o.TopColumnCenterSticky, Object.assign({}, e)),
                l.default.createElement(o.TopColumnRightSticky, Object.assign({}, e))
              ),
              l.default.createElement(s.Search, { instance: 'sticky' })
            )
          : null
      }
      function h(e) {
        return l.default.createElement(
          l.default.Fragment,
          null,
          l.default.createElement(u, Object.assign({}, e)),
          l.default.createElement(m, Object.assign({}, e))
        )
      }
      function f(e) {
        return l.default.createElement(
          r.HeaderWrapper,
          Object.assign({}, e),
          l.default.createElement(
            r.TopWrapper,
            null,
            e.showLogoLink
              ? l.default.createElement(r.TopColumnCenter, null)
              : l.default.createElement(r.TopColumnCenterNoLink, null)
          )
        )
      }
      function _(e) {
        return l.default.createElement(d.IncludeDrawer, Object.assign({}, e))
      }
      function b(e) {
        let a = e.showUserNavigation && !e.userIsLoggedIn,
          t = e.showSubNavigation && (e.data.breadcrumb || e.data.subsections)
        return l.default.createElement(
          r.HeaderWrapper,
          Object.assign({}, e),
          a ? l.default.createElement(n.UserActionsNav, Object.assign({}, e)) : null,
          l.default.createElement(
            r.TopWrapper,
            null,
            e.showLogoLink
              ? l.default.createElement(r.TopColumnCenter, null)
              : l.default.createElement(r.TopColumnCenterNoLink, null)
          ),
          l.default.createElement(
            n.NavDesktop,
            null,
            e.showUserNavigation ? l.default.createElement(n.NavListRight, Object.assign({}, e)) : null
          ),
          t ? l.default.createElement(i.SubNavigation, Object.assign({}, e)) : null
        )
      }
      ;(u.defaultProps = { ...c, showLogoLink: !0 }),
        (m.defaultProps = c),
        (a.Header = h),
        (h.defaultProps = c),
        (a.LogoOnly = f),
        (f.defaultProps = c),
        (a.Drawer = _),
        (_.defaultProps = c),
        (a.NoOutboundLinksHeader = b),
        (b.defaultProps = c)
    },
    5673: (e, a) => {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }),
        (a.ariaSelected = void 0),
        (a.ariaSelected = (e) =>
          e.selected ? { 'aria-label': `${e.label}, current page`, 'aria-current': 'page' } : null)
    },
    1450: () => {},
    9712: () => {}
  })
