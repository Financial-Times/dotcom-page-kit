# @financial-times/anvil-ui-ft-layout

This module provides an abstraction over the navigation UI components for FT.com to simplify selection (and showing/hiding) of the various options:

- Header
  - [] Standard
  - [] Sticky
  - [] Logo-only
- Drawer
- Footer
  - [] Standard
  - [] Legal

## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-layout
```

Usage is documented in [Storybook](http://localhost:9001/?path=/story/ft-layout--default-components), but a basic implementation is as follows:

```tsx
import { Layout } from '@financial-times/anvil-ui-ft-layout'

// Data is returned by anvil-middleware-ft-navigation
const navData: THeaderProps = {...}

<Layout props={navData}>
  {/* Your app here */}
</Layout>
```

## Customisation

### Props

| PROP         |  TYPE                                                  | OPTIONAL | DEFAULT    | DESCRIPTION                                   |
| ------------ | -------------------------------------------------------| -------- | ---------- | ----------------------------------------------|
| props        | THeaderProps                                           | true*    | {}         | Required _unless_ the `header` prop is `logo` |
| header       | 'standard' \| 'sticky' \| 'logo' \| React.ReactElement | true     | 'standard' | The type of header to display                 |
| headerBefore | string \| React.ReactElement                           | true     | undefined   | A slot for content to appear before Header    |
| headerAfter  | string \| React.ReactElement                           | true     | undefined   | A slot for content to appear after Header     |
| footer       | 'standard' \| 'legal' \| React.ReactElement            | true     | 'standard' | The type of footer to display                 |
| footerBefore | string \| React.ReactElement                           | true     | undefined   | A slot for content to appear before Footer    |
| footerAfter  | string \| React.ReactElement                           | true     | undefined   | A slot for content to appear after Footer     |

### Custom components

All slots accept both custom React components and HTML

```tsx
import { Layout } from '@financial-times/anvil-ui-ft-layout'

const html = getAdsCode(id) // => <iframe>...<iframe>

<Layout
  header={<CustomHeader />}
  headerAfter={html}
  footer={<CustomFooter />}
>
  {/* Your app here */}
</Layout>
```

### Template utility

Layout exports a `Template` utility component that allows you to insert a string of HTML into your own JSX. 

| PROP         |  TYPE                         | OPTIONAL | DEFAULT  | DESCRIPTION                  |
| ------------ | ------------------------------| -------- | -------- | ---------------------------- |
| ...rest      | any                           | true     | undefined | Additional props as required |

Any props you pass to Template will be reflected on the `div` that is used to insert your content via `__dangerouslySetInnerHTML`

This lets you pass styles or classes so that `grid` or `flex` layouts are applied to the children rendered within

```tsx
import { Template } from '@financial-times/anvil-ui-ft-layout'

<ul className="flex-container">
  <Template style={{display: content}}>
    {/* display: content means that these <li>s are flex children despite the intermediate div */}
    {`
      <li>some Handlebars content</li>
      <li>some Handlebars content</li>
    `} 
  </Template>
</ul>
```

> NOTE! `__dangerouslySetInnerHTML` means that it's critical that you sanitise your input!
