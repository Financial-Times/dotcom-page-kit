# Design Decisions: Repository Structure

Before starting the Anvil project we surveyed the customer products engineering team to find out what difficulties they had when using the existing FT.com front-end system. There were 4 major themes:

1. Many people felt `n-ui` was a [black box] and that they were unsure what was inside and what it's responsibilities were.
2. Almost everybody complained about a lack of documentation.
3. Developers did feel able to make changes with confidence due to a lack of tests and a lot of functionality inside `n-ui` created or relied upon unclear side-effects.
4. `n-ui` prescribed a specific way to build an application which did not suit every project and required tricky workarounds.


## 1. Responsibilities

We have attempted to solve this problem by pulling out each piece of functionality into a flat structure. If you need to know what Anvil can do then looking at the list of packages should tell you. Packages are namespaced to group them by functionality:

```
anvil/
├── packages/
│   ├── anvil-middleware-assets
│   ├── anvil-middleware-ft-edition
│   ├── anvil-middleware-ft-navigation
│   ├── anvil-plugin-sass
│   ├── anvil-plugin-js
│   ├── anvil-server-asset-loader
│   ├── anvil-server-resource-hints
│   ├── anvil-ui-flags
│   ├── anvil-ui-footer
│   ├── anvil-ui-header
│   ├── anvil-ui-layout
│   └── anvil-ui-shell
```

- `anvil-middleware-*` packages provide a piece of [Express] compatible middleware. These should be very thin wrappers for generic packages.
- `anvil-plugin-*` packages provide extra functionality for the [Anvil CLI] tool.
- `anvil-server-*` are packages which provide generic pieces of functionality to be used on the server-side with Node.js
- `anvil-ui-*` are packages which can render a piece of UI or provide functionality to be used in the browser.

Details about the design of individual packages are covered in the [package design documentation].


## 2. Documentation

For example no documentation existed describing how to create a new app using `n-ui`.


## 3. Testing

for example the status of A/B tests is appended to each request by middleware, this data is automatically passed to the template by the server, client side JavaScript scrapes this information from the page. .  which were not covered by any integration tests.


[black box]: https://en.wikipedia.org/wiki/Black_box
[Express]: https://expressjs.com/
[Anvil CLI]: ../../packages/anvil/readme.md
[package design documentation]: package-design.md
