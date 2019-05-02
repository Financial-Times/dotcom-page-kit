# @financial-times/anvil-ui-ft-layout

This package provides and an abstraction over the header and footer navigation UI components for FT.com.

## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-layout
```

After installing the package you can use it to wrap your application views and pages. The layout includes all shared UI elements so you can focus on the contents of your pages.

### Usage with React

If you're using React you can use the `<Layout />` component to wrap your existing component tree.

```jsx
import Home from './pages/Home'
import { Layout } from '@financial-times/anvil-ui-ft-layout'

const page = <Layout {...options}><App /></Layout>
```

_Please note_ that the layout component is designed to be used on the server-side. It can be rendered on the client-side but there is not usually a good reason to do so. If possible you should consider `<App />` as your application root and client-side mounting point.

### Usage without React

If your application is not using React then you can use the `Layout()` component as a regular JavaScript function, without using JSX. In this case the `contents` option is used to pass in a prerendered string of HTML.

```js
const renderApp = require('./lib/render-app')
const { Layout } = require('@financial-times/anvil-ui-ft-layout')

const prerenderedHTML = renderApp()
const page = Layout({ contents: prerenderedHTML, ...options })
```

### Rendering to a string

However you are integrating the shell component with your applicaton you will need to convert the output from a [React element] to a string or stream of HTML to send to your application's users. You should use the [`react-dom`] package for this:

```js
const ReactDOM = require('react-dom/server')
const outputHTML = ReactDOM.renderToString(document)
```

[React element]: https://reactjs.org/docs/rendering-elements.html
[`react-dom`]: https://reactjs.org/docs/react-dom.html

---

For a full example for how to use this component please refer to the [FT UI example app][example].

[example]: ../../examples/basic-ft-ui/readme.md


## Options

### Props

| PROP         | TYPE                                                    | OPTIONAL | DEFAULT   | DESCRIPTION                                                                                  |
|--------------|---------------------------------------------------------|----------|-----------|----------------------------------------------------------------------------------------------|
| props        | THeaderProps                                            | true*    | {}        | Required _unless_ the `header` prop is set to `logo-only`                                    |
| header       | 'simple' \| 'large-logo' \| 'logo-only' \| ReactElement | true     | 'simple'  | The type of header to display                                                                |
| headerBefore | string \| ReactElement                                  | true     | undefined | A slot for content to appear before Header                                                   |
| headerAfter  | string \| ReactElement                                  | true     | undefined | A slot for content to appear after Header                                                    |
| footer       | 'simple' \| 'legal' \| ReactElement                     | true     | 'simple'  | The type of footer to display                                                                |
| footerBefore | string \| ReactElement                                  | true     | undefined | A slot for content to appear before Footer                                                   |
| footerAfter  | string \| ReactElement                                  | true     | undefined | A slot for content to appear after Footer                                                    |
| contents     | string                                                  | true     | undefined | A prerendered string of HTML used to insert the page contents when not using JSX composition |

### Custom components

All slots accept both custom React components or a string of HTML.

```jsx
import { Layout } from '@financial-times/anvil-ui-ft-layout'

const adBannerHTML = getAdBanner(id) // => <iframe>...<iframe>

<Layout
  headerBefore={adBannerHTML}
  header={<CustomHeader />}
  headerAfter={adBannerHTML}
  footer={<CustomFooter />}
/>
```
